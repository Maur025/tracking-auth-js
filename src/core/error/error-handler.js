import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { authorizationErrorHandler } from "./authorization-error-handler.js";
import { zodErrorHandler } from "./zod-error-handler.js";

/**
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
	const zodError = zodErrorHandler({ err, res });

	if (zodError) return zodError;

	const authError = authorizationErrorHandler({ err, res });

	if (authError) return authError;

	console.error(err);

	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		code: StatusCodes.INTERNAL_SERVER_ERROR,
		message: ReasonPhrases.INTERNAL_SERVER_ERROR.toUpperCase(),
	});
};
