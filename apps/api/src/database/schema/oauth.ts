import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  jsonb,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';
import { users } from './users.js';
import { projects } from './projects.js';
import { endUsers } from './end-users.js';

export const appUserOAuthAccounts = pgTable(
  'app_user_oauth_accounts',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    provider: varchar('provider', { length: 50 }).notNull(), // 'google' | 'facebook' | 'github' | 'discord'
    providerUserId: varchar('provider_user_id', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }),
    accessToken: varchar('access_token', { length: 2048 }),
    refreshToken: varchar('refresh_token', { length: 2048 }),
    expiresAt: timestamp('expires_at', { withTimezone: true }),
    profileData: jsonb('profile_data').default({}),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('app_user_oauth_provider_uid_idx').on(
      table.provider,
      table.providerUserId,
    ),
    index('app_user_oauth_user_idx').on(table.userId),
  ],
);

export const endUserOAuthAccounts = pgTable(
  'end_user_oauth_accounts',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    endUserId: uuid('end_user_id')
      .notNull()
      .references(() => endUsers.id, { onDelete: 'cascade' }),
    provider: varchar('provider', { length: 50 }).notNull(),
    providerUserId: varchar('provider_user_id', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }),
    accessToken: varchar('access_token', { length: 2048 }),
    refreshToken: varchar('refresh_token', { length: 2048 }),
    expiresAt: timestamp('expires_at', { withTimezone: true }),
    profileData: jsonb('profile_data').default({}),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('end_user_oauth_project_provider_uid_idx').on(
      table.projectId,
      table.provider,
      table.providerUserId,
    ),
    index('end_user_oauth_end_user_idx').on(table.endUserId),
  ],
);

export const projectOAuthConfigs = pgTable(
  'project_oauth_configs',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    provider: varchar('provider', { length: 50 }).notNull(), // 'google' | 'facebook' | 'github' | 'discord'
    clientId: varchar('client_id', { length: 512 }).notNull(),
    clientSecret: varchar('client_secret', { length: 512 }).notNull(),
    callbackUrl: varchar('callback_url', { length: 512 }),
    enabled: boolean('enabled').notNull().default(true),
    settings: jsonb('settings').default({}),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('project_oauth_config_unique_idx').on(
      table.projectId,
      table.provider,
    ),
    index('project_oauth_config_project_idx').on(table.projectId),
  ],
);

export type AppUserOAuthAccount = typeof appUserOAuthAccounts.$inferSelect;
export type EndUserOAuthAccount = typeof endUserOAuthAccounts.$inferSelect;
export type ProjectOAuthConfig = typeof projectOAuthConfigs.$inferSelect;
