PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_refresh_tokens` (
	`id` text PRIMARY KEY,
	`created_at` integer,
	`created_by` text,
	`updated_at` integer,
	`updated_by` text,
	`client_id` text NOT NULL,
	`issued_at` integer NOT NULL,
	`expires_at` integer NOT NULL,
	`expires_in` integer DEFAULT 0 NOT NULL,
	`token` text NOT NULL,
	`token_id` text NOT NULL,
	`token_parent_id` text,
	`state` text NOT NULL,
	`user_id` text NOT NULL,
	CONSTRAINT `fk_refresh_tokens_token_parent_id_refresh_tokens_id_fk` FOREIGN KEY (`token_parent_id`) REFERENCES `refresh_tokens`(`id`),
	CONSTRAINT `fk_refresh_tokens_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);
--> statement-breakpoint
INSERT INTO `__new_refresh_tokens`(`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `client_id`, `issued_at`, `expires_at`, `expires_in`, `token`, `token_id`, `token_parent_id`, `state`, `user_id`) SELECT `id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `client_id`, `issued_at`, `expires_at`, `expires_in`, `token`, `token_id`, `token_parent_id`, `state`, `user_id` FROM `refresh_tokens`;--> statement-breakpoint
DROP TABLE `refresh_tokens`;--> statement-breakpoint
ALTER TABLE `__new_refresh_tokens` RENAME TO `refresh_tokens`;--> statement-breakpoint
PRAGMA foreign_keys=ON;