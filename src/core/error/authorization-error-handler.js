import { StatusCodes, ReasonPhrases } from "http-status-codes";

/**
 * @param {object} request
 * @param {Error} request.err
 * @param {import('express').Response} request.res
 */
export const authorizationErrorHandler = ({ err, res }) => {
	if (err.name !== "UnauthorizedError") {
		return null;
	}

	return res.status(StatusCodes.UNAUTHORIZED).json({
		code: StatusCodes.UNAUTHORIZED,
		message: ReasonPhrases.UNAUTHORIZED.toUpperCase(),
	});
};
