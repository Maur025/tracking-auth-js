import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { baseSchema } from "../../../core/database/base-schema.js";

export const realmSchema = sqliteTable("realms", {
	...baseSchema,
	name: text("name").notNull(),
	code: text("code").notNull().unique(),
});
