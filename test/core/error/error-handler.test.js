import { vi, describe, beforeEach, afterEach, test, expect } from "vitest";
import { errorHandler } from "../../../src/core/error/error-handler.js";
import { ZodError } from "zod";

describe("Error handler test", () => {
	const mockRes = {
		status: vi.fn().mockReturnThis(),
		json: vi.fn().mockReturnValue({}),
	};

	let consoleErrorSpy;

	beforeEach(() => {
		consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	test("should return a zod validation error", () => {
		// GIVEN
		const expectedStatusCode = 400;
		const expectedResponse = {
			code: expectedStatusCode,
			message: "BAD REQUEST",
		};
		const err = new ZodError([]);

		// WHEN
		errorHandler(err, null, mockRes, null);

		// THEN
		expect(mockRes.status).toHaveBeenCalledWith(expectedStatusCode);
		expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining(expectedResponse));
		expect(consoleErrorSpy).not.toHaveBeenCalled();
	});

	test("should return a error 401 unauthorized", () => {
		// GIVEN
		const expectedStatusCode = 401;
		const expectedResponse = {
			code: expectedStatusCode,
			message: "UNAUTHORIZED",
		};
		const err = { name: "UnauthorizedError" };

		// WHEN
		errorHandler(err, null, mockRes, null);

		// THEN
		expect(mockRes.status).toHaveBeenCalledWith(expectedStatusCode);
		expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining(expectedResponse));
		expect(consoleErrorSpy).not.toHaveBeenCalled();
	});

	test("should return a error 500 when unknown error occurs", () => {
		// GIVEN
		const expectedStatusCode = 500;
		const expectedResponse = {
			code: expectedStatusCode,
			message: "INTERNAL SERVER ERROR",
		};
		const err = { name: "InternalServerError" };

		// WHEN
		errorHandler(err, null, mockRes, null);

		// THEN
		expect(mockRes.status).toHaveBeenCalledWith(expectedStatusCode);
		expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining(expectedResponse));
		expect(consoleErrorSpy).toHaveBeenCalled();
	});
});
