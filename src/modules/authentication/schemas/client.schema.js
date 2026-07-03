import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { baseSchema } from "../../../core/database/base-schema.js";
import { realmSchema } from "./realm.schema.js";
import { relations } from "drizzle-orm";

export const clientSchema = sqliteTable("clients", {
	...baseSchema,
	clientId: text("client_id").notNull(),
	clientSecret: text("client_secret"),
	webOrigins: text("web_origins"),
});

export const clientsRelations = relations(clientSchema, ({ one }) => ({
	realm: one(realmSchema, {
		fields: [clientSchema.realmId],
		references: [realmSchema.id],
	}),
}));
