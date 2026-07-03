CREATE TABLE `resources` (
	`id` text PRIMARY KEY,
	`created_at` integer,
	`created_by` text,
	`updated_at` integer,
	`updated_by` text,
	`name` text NOT NULL,
	`code` text NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE `role_permissions` (
	`id` text PRIMARY KEY,
	`created_at` integer,
	`created_by` text,
	`updated_at` integer,
	`updated_by` text,
	`role_id` text NOT NULL,
	`resource_id` text NOT NULL,
	`scope_id` text NOT NULL,
	CONSTRAINT `fk_role_permissions_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_role_permissions_resource_id_resources_id_fk` FOREIGN KEY (`resource_id`) REFERENCES `resources`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_role_permissions_scope_id_scopes_id_fk` FOREIGN KEY (`scope_id`) REFERENCES `scopes`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` text PRIMARY KEY,
	`created_at` integer,
	`created_by` text,
	`updated_at` integer,
	`updated_by` text,
	`name` text NOT NULL,
	`code` text NOT NULL,
	`realm_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `scopes` (
	`id` text PRIMARY KEY,
	`created_at` integer,
	`created_by` text,
	`updated_at` integer,
	`updated_by` text,
	`code` text NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE UNIQUE INDEX `permission_role_resource_scope` ON `role_permissions` (`role_id`,`resource_id`,`scope_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `role_code_realm_idx` ON `roles` (`code`,`realm_id`);