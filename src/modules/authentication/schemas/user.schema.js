import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { baseSchema } from "../../../core/database/base-schema.js";

export const userSchema = sqliteTable("users", {
	...baseSchema,
	name: text("name").notNull(),
	lastName: text("last_name"),
	username: text("username").notNull().unique(),
	password: text("password").notNull(),
});
