import { defineRelations } from "drizzle-orm";
import * as schema from "./schema.js";

export const relations = defineRelations(schema, (relation) => ({
	userRealmSchema: {
		user: relation.one.userSchema({
			from: relation.userRealmSchema.userId,
			to: relation.userSchema.id,
		}),
		realm: relation.one.realmSchema({
			from: relation.userRealmSchema.realmId,
			to: relation.realmSchema.id,
		}),
	},
	clientRealmSchema: {
		client: relation.one.clientSchema({
			from: relation.clientRealmSchema.clientId,
			to: relation.clientSchema.id,
		}),
		realm: relation.one.realmSchema({
			from: relation.clientRealmSchema.realmId,
			to: relation.realmSchema.id,
		}),
	},
	refreshTokenSchema: {
		user: relation.one.userSchema({
			from: relation.refreshTokenSchema.userId,
			to: relation.userSchema.id,
		}),
	},
	rolePermissionSchema: {
		role: relation.one.roleSchema({
			from: relation.rolePermissionSchema.roleId,
			to: relation.roleSchema.id,
		}),
		resource: relation.one.resourceSchema({
			from: relation.rolePermissionSchema.resourceId,
			to: relation.resourceSchema.id,
		}),
		scope: relation.one.scopeSchema({
			from: relation.rolePermissionSchema.scopeId,
			to: relation.scopeSchema.id,
		}),
	},
	roleSchema: {
		rolePermissions: relation.many.rolePermissionSchema(),
	},
	userRoleSchema: {
		role: relation.one.roleSchema({
			from: relation.userRoleSchema.roleId,
			to: relation.roleSchema.id,
		}),
	},
	realmAudienceSchema: {
		audience: relation.one.audienceSchema({
			from: relation.realmAudienceSchema.audienceId,
			to: relation.audienceSchema.id,
		}),
	},
}));
