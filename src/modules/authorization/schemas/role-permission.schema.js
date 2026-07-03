import { sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { baseSchema } from "../../../core/database/base-schema.js";
import { roleSchema } from "./role.schema.js";
import { resourceSchema } from "./resource.schema.js";
import { scopeSchema } from "./scope.schema.js";

export const rolePermissionSchema = sqliteTable(
	"role_permissions",
	{
		...baseSchema,
		roleId: text("role_id")
			.notNull()
			.references(() => roleSchema.id, { onDelete: "cascade" }),
		resourceId: text("resource_id")
			.notNull()
			.references(() => resourceSchema.id, { onDelete: "cascade" }),
		scopeId: text("scope_id")
			.notNull()
			.references(() => scopeSchema.id, { onDelete: "cascade" }),
	},
	(table) => [
		uniqueIndex("permission_role_resource_scope").on(
			table.roleId,
			table.resourceId,
			table.scopeId,
		),
	],
);
