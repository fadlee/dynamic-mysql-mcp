import { parseMySqlAuthArgs } from '../validators/auth.js';
import type { ToolHandlerContext, ToolHandlerMap } from './types.js';

export function createAuthToolHandlers(context: ToolHandlerContext): ToolHandlerMap {
  const { api } = context;

  return {
    auth_mysql: async (args) => api.authMySql(parseMySqlAuthArgs(args)),
    get_auth_status: async () => api.getAuthStatus(),
    logout: async () => api.logout(),
  };
}
