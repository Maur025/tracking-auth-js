import { sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { baseSchema } from "../../../core/database/base-schema.js";
import { clientSchema } from "./client.schema.js";
import { realmSchema } from "./realm.schema.js";

export const clientRealmSchema = sqliteTable(
	"client_realms",
	{
		...baseSchema,
		clientId: text("client_id")
			.notNull()
			.references(() => clientSchema.id),
		realmId: text("realm_id")
			.notNull()
			.references(() => realmSchema.id),
	},
	(table) => [uniqueIndex("client_realm_unique_index").on(table.clientId, table.realmId)],
);
