import { vi, describe, beforeEach, afterEach, test, expect } from "vitest";
import { serverApp } from "../../src/core/server-app.js";
import express from "express";

vi.mock("express", () => ({
	default: vi.fn(),
}));

describe("Server app test", () => {
	let mockExpressApp;

	/** @type {import('vitest').Mock} */
	let mockAppUse;
	/** @type {import('vitest').Mock} */
	let mockAppListen;

	/** @type {import('vitest').Mock} */
	let mockExpressJson;
	/** @type {import('vitest').Mock} */
	let mockExpressText;
	/** @type {import('vitest').Mock} */
	let mockExpressUrlEncoded;
	/** @type {import('vitest').Mock} */
	let mockExpressStatic;
	/** @type {import('vitest').Mock} */
	let mockExpressRouter;

	const mockEnvironment = {
		APP_PORT: 3000,
		APP_STATIC_PUBLIC_PATH: "/public",
	};

	beforeEach(() => {
		mockExpressJson = vi.fn();
		mockExpressText = vi.fn();
		mockExpressUrlEncoded = vi.fn();
		mockExpressStatic = vi.fn();
		mockExpressRouter = vi.fn().mockReturnValue({});

		express.json = mockExpressJson;
		express.text = mockExpressText;
		express.urlencoded = mockExpressUrlEncoded;
		express.static = mockExpressStatic;
		express.Router = mockExpressRouter;

		mockAppUse = vi.fn().mockReturnThis();
		mockAppListen = vi.fn();

		mockExpressApp = {
			use: mockAppUse,
			listen: mockAppListen,
		};
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	test("should create new instance of express and export handler methods", () => {
		// GIVEN
		mockApp();
		// WHEN
		const server = serverApp({ environment: mockEnvironment });

		// THEN
		expect(server.app).toBe(mockExpressApp);
		expect(server).toEqual(
			expect.objectContaining({
				initialize: expect.any(Function),
				listen: expect.any(Function),
				errorHandlers: expect.any(Function),
				registerRoutes: expect.any(Function),
			}),
		);
	});

	test("should initialize the server", () => {
		// GIVEN
		mockApp();
		const expectedJsonOptions = { limit: "25mb" };
		const expectedTextOptions = { limit: "25mb" };
		const expectedUrlEncodedOptions = {
			extended: true,
			parameterLimit: 100_000,
			limit: "25mb",
		};
		// WHEN
		const { initialize } = serverApp({ environment: mockEnvironment });
		initialize();

		// THEN
		expect(mockAppUse).toHaveBeenCalled();
		expect(mockExpressJson).toHaveBeenCalledWith(expect.objectContaining(expectedJsonOptions));
		expect(mockExpressText).toHaveBeenCalledWith(expect.objectContaining(expectedTextOptions));
		expect(mockExpressUrlEncoded).toHaveBeenCalledWith(
			expect.objectContaining(expectedUrlEncodedOptions),
		);
		expect(mockExpressStatic).toHaveBeenCalledWith(mockEnvironment.APP_STATIC_PUBLIC_PATH);
	});

	test("should do server listen petitions", () => {
		// GIVEN
		mockApp();
		mockAppListen.mockImplementation((_, callback) => {
			callback();
		});
		const logMessage = vi.fn();

		// WHEN
		const { listen } = serverApp({ environment: mockEnvironment });
		listen(logMessage);
		// THEN

		expect(mockAppListen).toHaveBeenCalledWith(mockEnvironment.APP_PORT, expect.any(Function));
		expect(logMessage).toHaveBeenCalledWith(mockEnvironment.APP_PORT);
	});

	test("should registry error handlers", () => {
		// GIVEN
		mockApp();
		const notFoundHandler = vi.fn();
		const errorHandler = vi.fn();

		// WHEN
		const { errorHandlers } = serverApp({ environment: mockEnvironment });
		errorHandlers({ notFoundHandler, errorHandler });
		// THEN

		expect(mockAppUse).toHaveBeenCalledWith(notFoundHandler);
		expect(mockAppUse).toHaveBeenCalledWith(errorHandler);
	});

	test("should register routes in app", () => {
		// GIVEN
		mockApp();
		const routesToRegister = [
			{ route: vi.fn(), controller: vi.fn() },
			{ route: vi.fn(), controller: vi.fn() },
		];

		// WHEN
		const { registerRoutes } = serverApp({ environment: mockEnvironment });
		registerRoutes(...routesToRegister);

		// THEN
		for (const { route, controller } of routesToRegister) {
			expect(route).toHaveBeenCalledWith(
				expect.objectContaining({
					apiRouter: expect.any(Object),
					router: expect.any(Function),
					controller,
				}),
			);
			expect(mockExpressRouter).toHaveBeenCalledWith();
		}
	});

	const mockApp = () => {
		express.mockReturnValue(mockExpressApp);
	};
});
