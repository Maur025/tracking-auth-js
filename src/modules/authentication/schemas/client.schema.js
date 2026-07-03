import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { baseSchema } from "../../../core/database/base-schema.js";

export const clientSchema = sqliteTable("clients", {
	...baseSchema,
	clientId: text("client_id").notNull(),
	clientSecret: text("client_secret"),
	webOrigins: text("web_origins"),
});
