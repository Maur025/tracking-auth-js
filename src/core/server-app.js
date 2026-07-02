import compression from "compression";
import cors from "cors";
import express from "express";

/**
 * @param {object} request
 * @param {import('../config/environment.js').EnvironmentConfig} request.environment
 */
export const serverApp = ({ environment }) => {
	const app = express();

	const initialize = () => {
		app.use(compression())
			.use(
				cors({
					origin: "*",
					methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
					allowedHeaders: ["Content-Type", "Authorization"],
				}),
			)
			.use(express.json({ limit: "25mb" }))
			.use(express.text({ limit: "25mb" }))
			.use(express.urlencoded({ extended: true, parameterLimit: 100_000, limit: "25mb" }))
			.use("/", express.static(environment.APP_STATIC_PUBLIC_PATH));
	};

	/** @param {Function} listenCallback */
	const listen = (listenCallback) => {
		app.listen(environment.APP_PORT, () => {
			listenCallback(environment.APP_PORT);
		});
	};

	/**
	 * @param {object} request
	 * @param {import('./error/not-found-handler.js').notFoundHandler} request.notFoundHandler
	 * @param {import('./error/error-handler.js').errorHandler} request.errorHandler
	 */
	const errorHandlers = ({ notFoundHandler, errorHandler }) => {
		app.use(notFoundHandler);
		app.use(errorHandler);
	};

	/**
	 * @typedef {object} RegisterRouteItem
	 * @property {Function} route
	 * @property {object} controller
	 * @param  {...RegisterRouteItem} registerItems
	 */
	const registerRoutes = (...registerItems) => {
		const apiRouter = express.Router();

		registerItems.forEach(({ route, controller }) =>
			route({ apiRouter, router: express.Router, controller }),
		);

		app.use("/api", apiRouter);
	};

	return { app, initialize, listen, errorHandlers, registerRoutes };
};
