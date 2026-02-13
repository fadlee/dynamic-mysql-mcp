import type { DescribeTableArgs, UseDatabaseArgs } from '../types.js';
import { ValidationError } from '../errors.js';
import {
  optionalString,
  requireString,
  type UnknownObject,
} from './common.js';
export function parseDescribeTableArgs(args: UnknownObject): DescribeTableArgs {
  return {
    table: requireString(args.table, 'table'),
    database: optionalString(args.database, 'database'),
  };
}

export function parseUseDatabaseArgs(args: UnknownObject): UseDatabaseArgs {
  return {
    database: requireString(args.database, 'database'),
  };
}

export function parseOptionalDatabase(args: UnknownObject): string | undefined {
  const database = args.database;
  if (database === undefined) {
    return undefined;
  }

  return requireString(database, 'database');
}

export function parseTableName(args: UnknownObject): string {
  return requireString(args.table, 'table');
}

export function parseOrderBy(orderBy: string): string {
  const match = orderBy.trim().match(/^([A-Za-z_][A-Za-z0-9_]*)(\s+(ASC|DESC))?$/i);
  if (!match) {
    throw new ValidationError(
      'Invalid parameter: orderBy must be in format "column" or "column ASC|DESC"'
    );
  }

  const column = match[1];
  const direction = match[3]?.toUpperCase();
  return direction ? `${column} ${direction}` : column;
}
