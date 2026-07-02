import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
// eslint-disable-next-line no-unused-vars
export const notFoundHandler = (req, res, next) => {
	res.status(StatusCodes.NOT_FOUND).json({
		code: StatusCodes.NOT_FOUND,
		message: ReasonPhrases.NOT_FOUND.toUpperCase(),
	});
};
