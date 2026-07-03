CREATE TABLE `user_roles` (
	`id` text PRIMARY KEY,
	`created_at` integer,
	`created_by` text,
	`updated_at` integer,
	`updated_by` text,
	`user_id` text NOT NULL,
	`role_id` text NOT NULL,
	CONSTRAINT `fk_user_roles_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`)
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_roles` (
	`id` text PRIMARY KEY,
	`created_at` integer,
	`created_by` text,
	`updated_at` integer,
	`updated_by` text,
	`name` text NOT NULL,
	`code` text NOT NULL,
	`realm_id` text
);
--> statement-breakpoint
INSERT INTO `__new_roles`(`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `name`, `code`, `realm_id`) SELECT `id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `name`, `code`, `realm_id` FROM `roles`;--> statement-breakpoint
DROP TABLE `roles`;--> statement-breakpoint
ALTER TABLE `__new_roles` RENAME TO `roles`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `role_code_realm_idx` ON `roles` (`code`,`realm_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_role_unique_index` ON `user_roles` (`user_id`,`role_id`);