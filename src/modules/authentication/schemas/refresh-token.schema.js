import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { baseSchema } from "../../../core/database/base-schema.js";
import { userSchema } from "./user.schema.js";

export const refreshTokenSchema = sqliteTable("refresh_tokens", {
	...baseSchema,
	clientId: text("client_id").notNull(),
	issued_at: integer("issued_at", { mode: "timestamp" }).notNull(),
	expires_at: integer("expires_at", { mode: "timestamp" }).notNull(),
	expires_in: integer("expires_in").notNull().default(0),
	token: text("token").notNull(),
	tokenId: text("token_id").notNull(),
	tokenParentId: text("token_parent_id").references(() => refreshTokenSchema.id),
	state: text("state").notNull(), // ACTIVE, REVOKED, EXPIRED
	userId: text("user_id")
		.notNull()
		.references(() => userSchema.id),
});
