import { vi, describe, beforeEach, afterEach, test, expect } from "vitest";
import { notFoundHandler } from "../../../src/core/error/not-found-handler.js";

describe("Not found handler test", () => {
	const mockRes = {
		status: vi.fn().mockReturnThis(),
		json: vi.fn().mockReturnValue({}),
	};

	beforeEach(() => {});

	afterEach(() => {
		vi.clearAllMocks();
	});

	test("should response 404 when endpoint is not implemented", () => {
		// GIVEN
		const expectedStatusCode = 404;
		const expectedResponse = {
			code: expectedStatusCode,
			message: "NOT FOUND",
		};
		// WHEN

		notFoundHandler(null, mockRes, null);
		// THEN

		expect(mockRes.status).toHaveBeenCalledWith(expectedStatusCode);
		expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining(expectedResponse));
	});
});
