PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` text PRIMARY KEY,
	`created_at` integer,
	`created_by` text,
	`updated_at` integer,
	`updated_by` text,
	`name` text NOT NULL,
	`last_name` text,
	`username` text NOT NULL UNIQUE,
	`password` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`(`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `name`, `last_name`, `username`, `password`) SELECT `id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `name`, `last_name`, `username`, `password` FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `client_realm_unique_index` ON `client_realms` (`client_id`,`realm_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_realm_unique_index` ON `user_realms` (`user_id`,`realm_id`);