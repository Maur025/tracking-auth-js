import { sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { baseSchema } from "../../../core/database/base-schema.js";
import { roleSchema } from "./role.schema.js";

export const userRoleSchema = sqliteTable(
	"user_roles",
	{
		...baseSchema,
		userId: text("user_id").notNull(),
		roleId: text("role_id")
			.notNull()
			.references(() => roleSchema.id),
	},
	(table) => [uniqueIndex("user_role_unique_index").on(table.userId, table.roleId)],
);
