import { z } from 'zod';
import { createRouter } from './context';

export const exampleRouter = createRouter()
  .query('test', {
    resolve() {
      return {
        greeting: `Hello world`,
      };
    },
  })
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? 'world'}`,
      };
    },
  });
