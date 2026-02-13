import type { MySqlAuthArgs } from '../types.js';
import { ValidationError } from '../errors.js';
import { optionalInteger, requireString, type UnknownObject } from './common.js';

export function parseMySqlAuthArgs(args: UnknownObject): MySqlAuthArgs {
  if (args.password === undefined || args.password === null) {
    throw new ValidationError('Missing required parameter: password');
  }

  if (typeof args.password !== 'string') {
    throw new ValidationError('Invalid parameter: password must be a string');
  }

  const parsed: MySqlAuthArgs = {
    host: args.host === undefined ? '127.0.0.1' : requireString(args.host, 'host'),
    user: requireString(args.user, 'user'),
    password: args.password,
  };

  const port = optionalInteger(args.port, 'port');
  if (port !== undefined) {
    if (port < 1 || port > 65535) {
      throw new ValidationError('Invalid parameter: port must be between 1 and 65535');
    }
    parsed.port = port;
  }

  if (args.database !== undefined) {
    parsed.database = requireString(args.database, 'database');
  }

  if (args.ssl !== undefined) {
    if (typeof args.ssl !== 'boolean') {
      throw new ValidationError('Invalid parameter: ssl must be a boolean');
    }
    parsed.ssl = args.ssl;
  }

  return parsed;
}
