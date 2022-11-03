// src/server/router/index.ts
import superjson from 'superjson';
import { createRouter } from './context';

import { signUpRouter } from './auth';
import { exampleRouter } from './example';
import { userRouter } from './user';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('auth.', signUpRouter)
  .merge('user.', userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
