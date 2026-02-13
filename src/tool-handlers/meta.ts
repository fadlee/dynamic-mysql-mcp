import type { ToolHandlerContext, ToolHandlerMap } from './types.js';

export function createMetaToolHandlers(context: ToolHandlerContext): ToolHandlerMap {
  const { api } = context;

  return {
    health: async () => api.health(),
  };
}
