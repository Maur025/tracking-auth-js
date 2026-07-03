import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { baseSchema } from "../../../core/database/base-schema.js";

export const resourceSchema = sqliteTable("resources", {
	...baseSchema,
	name: text("name").notNull(),
	code: text("code").notNull().unique(),
});
