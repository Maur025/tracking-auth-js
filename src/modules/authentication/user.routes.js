/**
 * @param {object} request
 * @param {import('express').Router} request.apiRouter
 * @param {typeof import('express').Router} request.router
 * @param {ReturnType<typeof import('./user.controller.js').userController>} request.controller
 */
export const userRoutes = ({ apiRouter, router, controller }) => {
	const { findAll } = controller;
	const userRouter = router();

	userRouter.get("/", findAll);

	apiRouter.use("/users", userRouter);
	return { userRouter };
};
