import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

import type { AppRouter } from "../server";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
});

async function main() {
  let response = await trpc.signup.mutate({
    email: "Parteekkumar",
    password: "dnsad",
  });

  console.log(response);
}

main();
