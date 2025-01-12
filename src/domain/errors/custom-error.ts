import { StatusCode } from "hono/utils/http-status";

export class AppError extends Error {
    constructor(
        public override readonly message: string,
        public readonly statusCode: StatusCode, // Cambiar de number a StatusCode
    ) {
        super(message);
    }

    static badRequest(message: string) {
        return new AppError(message, 400);
    }

    static unauthorized(message: string) {
        return new AppError(message, 401);
    }

    static forbidden(message: string) {
        return new AppError(message, 403);
    }

    static notFound(message: string) {
        return new AppError(message, 404);
    }

    static conflict(message: string) {
        return new AppError(message, 409);
    }

    static internalServerError(message: string = "Internal Server Error") {
        return new AppError(message, 500);
    }
}