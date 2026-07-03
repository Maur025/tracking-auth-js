import { sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { baseSchema } from "../../../core/database/base-schema.js";
import { audienceSchema } from "./audience.schema.js";

export const realmAudienceSchema = sqliteTable(
	"realm_audiences",
	{
		...baseSchema,
		realmId: text("realm_id").notNull(),
		audienceId: text("audience_id")
			.notNull()
			.references(() => audienceSchema.id),
	},
	(table) => [uniqueIndex("realm_audience_unique_index").on(table.realmId, table.audienceId)],
);
