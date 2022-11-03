import * as trpc from '@trpc/server';
import { hash } from 'argon2';
import { signUpSchema } from '../../common/auth';
import { createRouter } from './context';

export const signUpRouter = createRouter().mutation('signup', {
  input: signUpSchema,
  resolve: async ({ input, ctx }) => {
    const { username, email, nama, password } = input;

    const exist = await ctx.prisma.user.findFirst({
      where: { email },
    });

    if (exist) {
      throw new trpc.TRPCError({
        code: 'CONFLICT',
        message: 'User already exists.',
      });
    }

    const hashedPassword = await hash(password);

    const result = await ctx.prisma.user.create({
      data: { username, email, nama, password: hashedPassword },
    });

    return {
      status: 201,
      message: 'Account created successfully',
      result: result.email,
    };
  },
});
