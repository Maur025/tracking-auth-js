const {
	APP_PORT = 7770,
	APP_STATIC_PUBLIC_PATH = "./public",
	DB_URL = "./database/tracking-auth.db",
} = process.env;

/**
 * @typedef {object} EnvironmentConfig
 * @property {number} APP_PORT - The port number on which the application will run.
 * @property {string} APP_STATIC_PUBLIC_PATH - The path to the static public directory.
 * @property {string} DB_URL - The path to the SQLite database file.
 */

/** @type {EnvironmentConfig} */
export const environment = {
	APP_PORT: Number(APP_PORT),
	APP_STATIC_PUBLIC_PATH,

	DB_URL,
};
