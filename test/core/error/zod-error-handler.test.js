import { vi, describe, beforeEach, afterEach, test, expect } from "vitest";
import { ZodError } from "zod";
import { zodErrorHandler } from "../../../src/core/error/zod-error-handler.js";

describe("Zod error handler test", () => {
	const mockRes = {
		status: vi.fn().mockReturnThis(),
		json: vi.fn().mockReturnValue({}),
	};

	beforeEach(() => {});

	afterEach(() => {
		vi.clearAllMocks();
	});

	test("should return a 400 status when zod validation error", () => {
		// GIVEN
		const expectedStatusCode = 400;
		const expectedResponse = {
			code: expectedStatusCode,
			message: "BAD REQUEST",
		};
		const err = new ZodError([
			{
				code: "invalid_type",
				expected: "string",
				received: "number",
				path: ["name"],
				message: "Expected string, received number",
			},
		]);

		// WHEN
		const result = zodErrorHandler({ err, res: mockRes });

		// THEN
		expect(result).not.toBeNull();
		expect(mockRes.status).toHaveBeenCalledWith(expectedStatusCode);
		expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining(expectedResponse));
	});

	test("should return null when not is zod validation error", () => {
		// GIVEN
		const err = new Error("Some other error");
		// WHEN
		const result = zodErrorHandler({ err, res: mockRes });

		// THEN
		expect(result).toBeNull();
		expect(mockRes.status).not.toHaveBeenCalled();
		expect(mockRes.json).not.toHaveBeenCalled();
	});
});
