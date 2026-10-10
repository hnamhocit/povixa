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
import { projects } from './projects.js';

export const endUsers = pgTable(
  'end_users',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    email: varchar('email', { length: 255 }).notNull(),
    name: varchar('name', { length: 255 }),
    avatarUrl: varchar('avatar_url', { length: 512 }),
    passwordHash: varchar('password_hash', { length: 255 }),
    status: varchar('status', { length: 50 }).notNull().default('active'),
    emailVerified: boolean('email_verified').notNull().default(false),
    metadata: jsonb('metadata').default({}),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('end_user_project_email_idx').on(
      table.projectId,
      table.email,
    ),
    index('end_user_project_idx').on(table.projectId),
  ],
);

export type EndUser = typeof endUsers.$inferSelect;
export type NewEndUser = typeof endUsers.$inferInsert;
