import {
  parseDescribeTableArgs,
  parseOptionalDatabase,
  parseUseDatabaseArgs,
} from '../validators/collections.js';
import type { ToolHandlerContext, ToolHandlerMap } from './types.js';

export function createCollectionToolHandlers(context: ToolHandlerContext): ToolHandlerMap {
  const { api } = context;

  return {
    list_databases: async () => api.listDatabases(),
    use_database: async (args) => api.useDatabase(parseUseDatabaseArgs(args)),
    list_tables: async (args) => api.listTables(parseOptionalDatabase(args)),
    describe_table: async (args) => api.describeTable(parseDescribeTableArgs(args)),
  };
}
