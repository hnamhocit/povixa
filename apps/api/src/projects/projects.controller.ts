import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ProjectsService,
  type CreateProjectDto,
  type ConfigureProjectOAuthDto,
} from './projects.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller()
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('organizations/:orgId/projects')
  async createProject(
    @Param('orgId') orgId: string,
    @Req() req: any,
    @Body() dto: CreateProjectDto,
  ) {
    return this.projectsService.createProject(orgId, req.user.id, dto);
  }

  @Get('organizations/:orgId/projects')
  async getOrgProjects(
    @Param('orgId') orgId: string,
    @Req() req: any,
  ) {
    return this.projectsService.getProjects(orgId, req.user.id);
  }

  @Get('projects/:projectId')
  async getProjectDetails(
    @Param('projectId') projectId: string,
    @Req() req: any,
  ) {
    return this.projectsService.getProjectDetails(projectId, req.user.id);
  }

  @Post('projects/:projectId/oauth-configs')
  async configureProjectOAuth(
    @Param('projectId') projectId: string,
    @Req() req: any,
    @Body() dto: ConfigureProjectOAuthDto,
  ) {
    return this.projectsService.configureOAuth(projectId, req.user.id, dto);
  }

  @Get('projects/:projectId/end-users')
  async getProjectEndUsers(
    @Param('projectId') projectId: string,
    @Req() req: any,
  ) {
    return this.projectsService.getProjectEndUsers(projectId, req.user.id);
  }
}
