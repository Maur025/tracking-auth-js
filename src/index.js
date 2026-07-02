import "dotenv/config";
import { overrideLog } from "atx-prettylog";
import { appContext } from "./core/app-context.js";
import { userRoutes } from "./modules/authentication/user.routes.js";

overrideLog();

const bootstrap = async () => {
	try {
		const { registerAppRoutes, startServer } = appContext();

		startServer({
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
		console.error("[BOOTSTRAP] Error occurred while bootstrapping the application:", error);
		process.exit(1);
	}
};

bootstrap();
