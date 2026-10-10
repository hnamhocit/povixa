import { relations } from 'drizzle-orm';
import { users } from './users.js';
import { organizations, organizationMembers } from './organizations.js';
import { projects } from './projects.js';
import { endUsers } from './end-users.js';
import {
  appUserOAuthAccounts,
  endUserOAuthAccounts,
  projectOAuthConfigs,
} from './oauth.js';


// Re-export all tables and types
export * from './users.js';
export * from './organizations.js';
export * from './projects.js';
export * from './end-users.js';
export * from './oauth.js';
export * from './sessions.js';

// Define Drizzle Relations for deep querying
export const usersRelations = relations(users, ({ many }) => ({
  memberships: many(organizationMembers),
  createdOrganizations: many(organizations),
  createdProjects: many(projects),
  oauthAccounts: many(appUserOAuthAccounts),
}));

export const organizationsRelations = relations(
  organizations,
  ({ one, many }) => ({
    createdBy: one(users, {
      fields: [organizations.createdById],
      references: [users.id],
    }),
    members: many(organizationMembers),
    projects: many(projects),
  }),
);

export const organizationMembersRelations = relations(
  organizationMembers,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [organizationMembers.organizationId],
      references: [organizations.id],
    }),
    user: one(users, {
      fields: [organizationMembers.userId],
      references: [users.id],
    }),
  }),
);

export const projectsRelations = relations(projects, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [projects.organizationId],
    references: [organizations.id],
  }),
  createdBy: one(users, {
    fields: [projects.createdById],
    references: [users.id],
  }),
  endUsers: many(endUsers),
  oauthConfigs: many(projectOAuthConfigs),
}));

export const endUsersRelations = relations(endUsers, ({ one, many }) => ({
  project: one(projects, {
    fields: [endUsers.projectId],
    references: [projects.id],
  }),
  oauthAccounts: many(endUserOAuthAccounts),
}));

export const appUserOAuthAccountsRelations = relations(
  appUserOAuthAccounts,
  ({ one }) => ({
    user: one(users, {
      fields: [appUserOAuthAccounts.userId],
      references: [users.id],
    }),
  }),
);

export const endUserOAuthAccountsRelations = relations(
  endUserOAuthAccounts,
  ({ one }) => ({
    project: one(projects, {
      fields: [endUserOAuthAccounts.projectId],
      references: [projects.id],
    }),
    endUser: one(endUsers, {
      fields: [endUserOAuthAccounts.endUserId],
      references: [endUsers.id],
    }),
  }),
);

export const projectOAuthConfigsRelations = relations(
  projectOAuthConfigs,
  ({ one }) => ({
    project: one(projects, {
      fields: [projectOAuthConfigs.projectId],
      references: [projects.id],
    }),
  }),
);
