import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

const todoInputObject = z.object({
  title: z.string(),
  description: z.string(),
});

const appRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      // context
      const username = opts.ctx.username;
      console.log(username);

      let email = opts.input.email;
      let password = opts.input.password;

      // do db calls here
      // or any validations

      let token = "123123123";
      return {
        token,
      };
    }),

  createTodo: publicProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async (opts) => {
      console.log(opts.ctx.username);
      // is user does exist, then create todo otherwise throw error

      return {
        id: "1",
      };
    }),
});

const server = createHTTPServer({
  router: appRouter,
  createContext(opts) {
    let authHeader = opts.req.headers["authorization"];

    console.log(authHeader);
    // jwt verify
    return {
      username: "123",
    };
  },
});

server.listen(3000);

export type AppRouter = typeof appRouter;
