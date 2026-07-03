CREATE TABLE `audiences` (
	`id` text PRIMARY KEY,
	`created_at` integer,
	`created_by` text,
	`updated_at` integer,
	`updated_by` text,
	`code` text NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE `realm_audiences` (
	`id` text PRIMARY KEY,
	`created_at` integer,
	`created_by` text,
	`updated_at` integer,
	`updated_by` text,
	`realm_id` text NOT NULL,
	`audience_id` text NOT NULL,
	CONSTRAINT `fk_realm_audiences_audience_id_audiences_id_fk` FOREIGN KEY (`audience_id`) REFERENCES `audiences`(`id`)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `realm_audience_unique_index` ON `realm_audiences` (`realm_id`,`audience_id`);