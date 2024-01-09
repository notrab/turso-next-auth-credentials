CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text,
	`passwordHash` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
