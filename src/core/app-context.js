import { serverApp } from "./server-app.js";
import { environment } from "../config/environment.js";
import { notFoundHandler } from "./error/not-found-handler.js";
import { errorHandler } from "./error/error-handler.js";
import { userController } from "../modules/authentication/user.controller.js";
import { dbProvider } from "./database/db-provider.js";

export const appContext = () => {
	const userCtrl = userController();

	const { dbClient, migrateDb } = dbProvider({ environment });

	const {
		app: expressApp,
		initialize: appInitialize,
		listen: appListen,
		errorHandlers: appErrorHandlers,
		registerRoutes,
	} = serverApp({ environment });

	/**
	 * @param {object} request
	 * @param {Function} request.listenCallback
	 * @param {Function} request.registerRoutesCallback
	 */
	const startServer = async ({ listenCallback, registerRoutesCallback }) => {
		await migrateDb();

		appInitialize();

		registerRoutesCallback({ userCtrl });

		appErrorHandlers({
			notFoundHandler,
			errorHandler,
		});

		appListen(listenCallback);
	};

	/**
	 * @typedef {object} RegisterRouteItem
	 * @property {Function} route
	 * @property {object} controller
	 * @param  {...RegisterRouteItem} registerItems
	 */
	const registerAppRoutes = (...registerItems) => registerRoutes(...registerItems);

	return {
		dbClient,
		expressApp,
		startServer,
		registerAppRoutes,
	};
};
