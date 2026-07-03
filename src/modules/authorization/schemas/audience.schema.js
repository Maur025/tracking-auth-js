import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { baseSchema } from "../../../core/database/base-schema.js";

export const audienceSchema = sqliteTable("audiences", {
	...baseSchema,
	code: text("code").notNull().unique(),
});
