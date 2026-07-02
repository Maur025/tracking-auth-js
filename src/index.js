import "dotenv/config";
import { logger } from "./core/common/logger.js";
import { appContext } from "./core/app-context.js";
import { userRoutes } from "./modules/authentication/user.routes.js";

const bootstrap = async () => {
	try {
		const { registerAppRoutes, startServer } = appContext();

		await startServer({
			listenCallback: (port) => {
				console.info(`[SERVER] Application is running on port ${port}`);
			},
			registerRoutesCallback: ({ userCtrl }) => {
				registerAppRoutes({
					route: userRoutes,
					controller: userCtrl,
				});
			},
		});
	} catch (error) {
		logger.error("[BOOTSTRAP] Error occurred while bootstrapping the application:", error);
		process.exit(1);
	}
};

bootstrap();
