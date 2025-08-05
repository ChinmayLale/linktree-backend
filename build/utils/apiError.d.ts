import { ErrorRequestHandler } from 'express';
declare class ApiError extends Error {
    statusCode: number;
    error: string;
    success: boolean;
    constructor(statusCode: number, message?: string, error?: string);
}
declare const globalErrorHandler: ErrorRequestHandler;
export { ApiError, globalErrorHandler };
