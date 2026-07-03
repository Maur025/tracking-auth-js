import { sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { baseSchema } from "../../../core/database/base-schema.js";

export const roleSchema = sqliteTable(
	"roles",
	{
		...baseSchema,
		name: text("name").notNull(),
		code: text("code").notNull(),
		// Null = global role, otherwise it is a realm-specific role
		realmId: text("realm_id"),
	},
	(table) => [uniqueIndex("role_code_realm_idx").on(table.code, table.realmId)],
);
