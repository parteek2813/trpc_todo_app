import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

import type { AppRouter } from "../server";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",

      async headers() {
        return {
          authorization: "Bearer 14324234",
        };
      },
    }),
  ],
});

async function main() {
  let response = await trpc.createTodo.mutate({
    title: "Parteekkumar",
  });

  console.log(response);
}

main();
