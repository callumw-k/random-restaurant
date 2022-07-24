// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { restaurantRouter } from "./restaurant";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("restaurants.", restaurantRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
