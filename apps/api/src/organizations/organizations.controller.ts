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
  OrganizationsService,
  type CreateOrganizationDto,
} from './organizations.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('organizations')
@UseGuards(JwtAuthGuard)
export class OrganizationsController {
  constructor(private readonly orgService: OrganizationsService) {}

  @Post()
  async createOrganization(
    @Req() req: any,
    @Body() dto: CreateOrganizationDto,
  ) {
    return this.orgService.createOrganization(req.user.id, dto);
  }

  @Get()
  async getMyOrganizations(@Req() req: any) {
    return this.orgService.getUserOrganizations(req.user.id);
  }

  @Get(':id')
  async getOrganizationDetails(
    @Param('id') orgId: string,
    @Req() req: any,
  ) {
    return this.orgService.getOrganizationDetails(orgId, req.user.id);
  }
}
