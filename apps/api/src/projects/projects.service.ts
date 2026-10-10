import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { randomUUID } from 'node:crypto';
import { DRIZZLE, type DrizzleDB } from '../database/database.service.js';
import {
  organizations,
  organizationMembers,
} from '../database/schema/organizations.js';
import { projects, type Project } from '../database/schema/projects.js';
import { endUsers } from '../database/schema/end-users.js';
import {
  projectOAuthConfigs,
  type ProjectOAuthConfig,
} from '../database/schema/oauth.js';
import type { OAuthProvider } from '../auth/oauth.service.js';

export interface CreateProjectDto {
  name: string;
  slug: string;
  description?: string;
}

export interface ConfigureProjectOAuthDto {
  provider: OAuthProvider;
  clientId: string;
  clientSecret: string;
  callbackUrl?: string;
  enabled?: boolean;
}

@Injectable()
export class ProjectsService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  private async verifyOrgAccess(orgId: string, userId: string) {
    const member = await this.db
      .select()
      .from(organizationMembers)
      .where(
        and(
          eq(organizationMembers.organizationId, orgId),
          eq(organizationMembers.userId, userId),
        ),
      )
      .limit(1);

    if (!member.length) {
      throw new ForbiddenException('Access to organization denied');
    }

    const [org] = await this.db
      .select()
      .from(organizations)
      .where(eq(organizations.id, orgId))
      .limit(1);

    if (!org) {
      throw new NotFoundException('Organization not found');
    }

    return { org, role: member[0].role };
  }

  /**
   * Create Project within an Organization enforcing project quota (maxProjects)
   */
  async createProject(
    orgId: string,
    userId: string,
    dto: CreateProjectDto,
  ): Promise<Project> {
    const { org } = await this.verifyOrgAccess(orgId, userId);

    // Enforce maximum projects quota on the organization
    const currentProjects = await this.db
      .select()
      .from(projects)
      .where(eq(projects.organizationId, orgId));

    if (currentProjects.length >= org.maxProjects) {
      throw new BadRequestException(
        `Organization has reached its maximum quota of ${org.maxProjects} projects. Please upgrade your plan to create more projects.`,
      );
    }

    const slug = dto.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');

    const [newProject] = await this.db
      .insert(projects)
      .values({
        organizationId: orgId,
        createdById: userId,
        name: dto.name,
        slug,
        description: dto.description,
        apiKey: `pvx_${randomUUID().replace(/-/g, '')}`,
      })
      .returning();

    return newProject;
  }

  async getProjects(orgId: string, userId: string) {
    await this.verifyOrgAccess(orgId, userId);
    return this.db
      .select()
      .from(projects)
      .where(eq(projects.organizationId, orgId));
  }

  async getProjectDetails(projectId: string, userId: string) {
    const [project] = await this.db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.verifyOrgAccess(project.organizationId, userId);

    const configs = await this.db
      .select()
      .from(projectOAuthConfigs)
      .where(eq(projectOAuthConfigs.projectId, projectId));

    const totalEndUsers = await this.db
      .select()
      .from(endUsers)
      .where(eq(endUsers.projectId, projectId));

    return {
      ...project,
      totalEndUsers: totalEndUsers.length,
      oauthConfigs: configs.map((c) => ({
        id: c.id,
        provider: c.provider,
        clientId: c.clientId,
        callbackUrl: c.callbackUrl,
        enabled: c.enabled,
      })),
    };
  }

  /**
   * Configure OAuth credentials (Google, GitHub, Facebook, Discord) for End Users of this project
   */
  async configureOAuth(
    projectId: string,
    userId: string,
    dto: ConfigureProjectOAuthDto,
  ): Promise<ProjectOAuthConfig> {
    const [project] = await this.db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.verifyOrgAccess(project.organizationId, userId);

    const existing = await this.db
      .select()
      .from(projectOAuthConfigs)
      .where(
        and(
          eq(projectOAuthConfigs.projectId, projectId),
          eq(projectOAuthConfigs.provider, dto.provider),
        ),
      )
      .limit(1);

    if (existing.length > 0) {
      const [updated] = await this.db
        .update(projectOAuthConfigs)
        .set({
          clientId: dto.clientId,
          clientSecret: dto.clientSecret,
          callbackUrl: dto.callbackUrl,
          enabled: dto.enabled ?? true,
          updatedAt: new Date(),
        })
        .where(eq(projectOAuthConfigs.id, existing[0].id))
        .returning();
      return updated;
    }

    const [created] = await this.db
      .insert(projectOAuthConfigs)
      .values({
        projectId,
        provider: dto.provider,
        clientId: dto.clientId,
        clientSecret: dto.clientSecret,
        callbackUrl: dto.callbackUrl,
        enabled: dto.enabled ?? true,
      })
      .returning();

    return created;
  }

  /**
   * List End Users registered for this project
   */
  async getProjectEndUsers(projectId: string, userId: string) {
    const [project] = await this.db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.verifyOrgAccess(project.organizationId, userId);

    return this.db
      .select()
      .from(endUsers)
      .where(eq(endUsers.projectId, projectId));
  }
}
