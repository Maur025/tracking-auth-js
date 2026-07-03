import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { baseSchema } from "../../../core/database/base-schema.js";
import { realmSchema } from "./realm.schema.js";
import { relations } from "drizzle-orm";

export const userSchema = sqliteTable("users", {
	...baseSchema,
	name: text("name").notNull(),
	lastName: text("last_name"),
	username: text("username").notNull(),
	password: text("password").notNull(),
	realmId: text("realm_id")
		.notNull()
		.references(() => realmSchema.id),
});

export const usersRelations = relations(userSchema, ({ one }) => ({
	realm: one(realmSchema, {
		fields: [userSchema.realmId],
		references: [realmSchema.id],
	}),
}));
