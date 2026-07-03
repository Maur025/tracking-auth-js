import { vi, describe, beforeEach, afterEach, test, expect } from "vitest";
import { authorizationErrorHandler } from "../../../src/core/error/authorization-error-handler.js";

describe("Authorization error handler test", () => {
	const mockRes = {
		status: vi.fn().mockReturnThis(),
		json: vi.fn(),
	};

	beforeEach(() => {});

	afterEach(() => {
		vi.clearAllMocks();
	});

	test("should return a 401 status code", () => {
		// GIVEN
		const expectedStatusCode = 401;
		const expectedResponse = {
			code: expectedStatusCode,
			message: "UNAUTHORIZED",
		};

		const err = { name: "UnauthorizedError" };

		// WHEN
		authorizationErrorHandler({ err, res: mockRes });

		// THEN
		expect(mockRes.status).toHaveBeenCalledWith(expectedStatusCode);
		expect(mockRes.json).toHaveBeenCalledWith(expectedResponse);
	});

	test("should return null for non-UnauthorizedError", () => {
		// GIVEN
		const err = { name: "SomeOtherError" };

		// WHEN
		const result = authorizationErrorHandler({ err, res: mockRes });

		// THEN
		expect(result).toBeNull();
		expect(mockRes.status).not.toHaveBeenCalled();
		expect(mockRes.json).not.toHaveBeenCalled();
	});
});
