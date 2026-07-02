import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

/**
 * @param {object} request
 * @param {Error} request.err
 * @param {import('express').Response} request.res
 */
export const zodErrorHandler = ({ err, res }) => {
	if (!(err instanceof ZodError)) {
		return null;
	}

	return res.status(StatusCodes.BAD_REQUEST).json({
		code: StatusCodes.BAD_REQUEST,
		message: ReasonPhrases.BAD_REQUEST.toUpperCase(),
		errors: err.format(),
	});
};
