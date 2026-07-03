import { sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { baseSchema } from "../../../core/database/base-schema.js";
import { userSchema } from "./user.schema.js";
import { realmSchema } from "./realm.schema.js";

export const userRealmSchema = sqliteTable(
	"user_realms",
	{
		...baseSchema,
		userId: text("user_id")
			.notNull()
			.references(() => userSchema.id),
		realmId: text("realm_id")
			.notNull()
			.references(() => realmSchema.id),
	},
	(table) => [uniqueIndex("user_realm_unique_index").on(table.userId, table.realmId)],
);
