CREATE TABLE `refresh_tokens` (
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
	CONSTRAINT `fk_refresh_tokens_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);
