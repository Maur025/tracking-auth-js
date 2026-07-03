CREATE TABLE `client_realms` (
	`id` text PRIMARY KEY,
	`created_at` integer,
	`created_by` text,
	`updated_at` integer,
	`updated_by` text,
	`client_id` text NOT NULL,
	`realm_id` text NOT NULL,
	CONSTRAINT `fk_client_realms_client_id_clients_id_fk` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`),
	CONSTRAINT `fk_client_realms_realm_id_realms_id_fk` FOREIGN KEY (`realm_id`) REFERENCES `realms`(`id`)
);
--> statement-breakpoint
CREATE TABLE `clients` (
	`id` text PRIMARY KEY,
	`created_at` integer,
	`created_by` text,
	`updated_at` integer,
	`updated_by` text,
	`client_id` text NOT NULL,
	`client_secret` text,
	`web_origins` text
);
--> statement-breakpoint
CREATE TABLE `realms` (
	`id` text PRIMARY KEY,
	`created_at` integer,
	`created_by` text,
	`updated_at` integer,
	`updated_by` text,
	`name` text NOT NULL,
	`code` text NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE `user_realms` (
	`id` text PRIMARY KEY,
	`created_at` integer,
	`created_by` text,
	`updated_at` integer,
	`updated_by` text,
	`user_id` text NOT NULL,
	`realm_id` text NOT NULL,
	CONSTRAINT `fk_user_realms_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
	CONSTRAINT `fk_user_realms_realm_id_realms_id_fk` FOREIGN KEY (`realm_id`) REFERENCES `realms`(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY,
	`created_at` integer,
	`created_by` text,
	`updated_at` integer,
	`updated_by` text,
	`name` text NOT NULL,
	`last_name` text,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`realm_id` text NOT NULL,
	CONSTRAINT `fk_users_realm_id_realms_id_fk` FOREIGN KEY (`realm_id`) REFERENCES `realms`(`id`)
);
