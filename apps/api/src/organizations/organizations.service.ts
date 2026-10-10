import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { DRIZZLE, type DrizzleDB } from '../database/database.service.js';
import {
  organizations,
  organizationMembers,
  type Organization,
} from '../database/schema/organizations.js';
import { projects } from '../database/schema/projects.js';

export interface CreateOrganizationDto {
  name: string;
  slug: string;
  maxProjects?: number;
}

@Injectable()
export class OrganizationsService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async createOrganization(
    userId: string,
    dto: CreateOrganizationDto,
  ): Promise<Organization> {
    const slug = dto.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');

    const existing = await this.db
      .select()
      .from(organizations)
      .where(eq(organizations.slug, slug))
      .limit(1);

    if (existing.length > 0) {
      throw new BadRequestException(`Organization slug "${slug}" is already taken`);
    }

    const [newOrg] = await this.db
      .insert(organizations)
      .values({
        name: dto.name,
        slug,
        createdById: userId,
        maxProjects: dto.maxProjects ?? 5,
      })
      .returning();

    // Assign creating user as Organization Owner
    await this.db.insert(organizationMembers).values({
      organizationId: newOrg.id,
      userId,
      role: 'owner',
    });

    return newOrg;
  }

  async getUserOrganizations(userId: string) {
    const members = await this.db
      .select({
        organization: organizations,
        role: organizationMembers.role,
      })
      .from(organizationMembers)
      .innerJoin(
        organizations,
        eq(organizationMembers.organizationId, organizations.id),
      )
      .where(eq(organizationMembers.userId, userId));

    return members.map((m) => ({
      ...m.organization,
      userRole: m.role,
    }));
  }

  async getOrganizationDetails(orgId: string, userId: string) {
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
      throw new ForbiddenException('You do not have access to this organization');
    }

    const [org] = await this.db
      .select()
      .from(organizations)
      .where(eq(organizations.id, orgId))
      .limit(1);

    if (!org) {
      throw new NotFoundException('Organization not found');
    }

    const orgProjects = await this.db
      .select()
      .from(projects)
      .where(eq(projects.organizationId, orgId));

    return {
      ...org,
      userRole: member[0].role,
      projectsCount: orgProjects.length,
      projectsRemaining: Math.max(0, org.maxProjects - orgProjects.length),
      projects: orgProjects,
    };
  }
}
