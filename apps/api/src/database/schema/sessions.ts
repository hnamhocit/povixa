import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';

export const refreshTokens = pgTable(
  'refresh_tokens',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userType: varchar('user_type', { length: 50 }).notNull(), // 'app_user' | 'end_user'
    userId: uuid('user_id').notNull(),
    tokenHash: varchar('token_hash', { length: 255 }).notNull(),
    userAgent: varchar('user_agent', { length: 512 }),
    ipAddress: varchar('ip_address', { length: 128 }),
    revoked: boolean('revoked').notNull().default(false),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('refresh_tokens_user_idx').on(table.userType, table.userId),
    index('refresh_tokens_hash_idx').on(table.tokenHash),
    index('refresh_tokens_expires_idx').on(table.expiresAt),
  ],
);

export type RefreshToken = typeof refreshTokens.$inferSelect;
export type NewRefreshToken = typeof refreshTokens.$inferInsert;
