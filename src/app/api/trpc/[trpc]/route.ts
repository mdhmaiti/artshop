// this is the next js dynamic route that listens to any rquest with api/trpc/anything
// it listens to the request then forward to the trpc backend that is the index.ts in trpc.
// the appRouter in the index is the backend
//
// how to forward it ? by using the fetch request handler in the trpc
// then pass the end point as the api/trpc and router as the appRouter

import { appRouter } from "@/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) => {
  // it also takes createContext parameter; it essentially helps to manupulate the req and res
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    // @ts-expect-error context already passed from express middleware ; other wise build gives error
    createContext: () => ({}),
  });
};

export { handler as GET, handler as POST };
