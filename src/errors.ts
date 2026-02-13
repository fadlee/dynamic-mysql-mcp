export interface ErrorMetadata {
  statusCode?: number;
  details?: unknown;
}

export abstract class MCPServerError extends Error {
  abstract readonly type: string;
  readonly statusCode?: number;
  readonly details?: unknown;

  constructor(message: string, metadata?: ErrorMetadata) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = metadata?.statusCode;
    this.details = metadata?.details;
  }
}

export class ValidationError extends MCPServerError {
  readonly type = 'validation_error';
}

export class ApiError extends MCPServerError {
  readonly type = 'api_error';
}

export class AuthError extends MCPServerError {
  readonly type = 'auth_error';
}

export interface SerializedError {
  type: string;
  message: string;
  statusCode?: number;
  details?: unknown;
}

export function serializeError(error: unknown): SerializedError {
  if (error instanceof MCPServerError) {
    return {
      type: error.type,
      message: error.message,
      ...(error.statusCode !== undefined ? { statusCode: error.statusCode } : {}),
      ...(error.details !== undefined ? { details: error.details } : {}),
    };
  }

  if (error instanceof Error) {
    return {
      type: 'internal_error',
      message: error.message,
    };
  }

  return {
    type: 'internal_error',
    message: String(error),
  };
}
