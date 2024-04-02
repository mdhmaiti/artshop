// this index.ts is the backend
import { z } from "zod";
import { authRouter } from "./auth-router";
import { publicProcedure, router } from "./trpc";
import { QueryValidator } from "../lib/validators/query-validator";
import { getPayloadClient } from "../get-payload";
import { paymentRouter } from "./payment-router";

export const appRouter = router({
  // for the auth use the auth router; for the payment use the payment router
  auth: authRouter,
  payment: paymentRouter,

  // get infinte products to get the products in the home page when the user scrolls ;
  // it also has a loading state and a skeleton when the products are loading;
  // it is a highly customizable and resuable componet
  // it is connected wiht the query validator in the lib folder.
  //
  //
  // nullish is null or undefined -> cursor can be null or undefined
  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input;
      // queryOpts is a good property to know; ->
      // its main work is to provide the rest of the things that i have not defined/ fetching here;
      // eg : in this case if i remove the limit and then hove over the query opts it will show both the category and the limit
      const { sort, limit, ...queryOpts } = query;

      const payload = await getPayloadClient();

      const parsedQueryOpts: Record<string, { equals: string }> = {};

      // parsing the things so that it can be parsed in the payload
      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = {
          equals: value,
        };
      });
      // by default fetch the page 1
      const page = cursor || 1;

      // this thig below is like the pagination and it is provided by the payload; i mean the next page and has page;
      // but here we are using the trpc and zod and defing a custom way on what to fetch; this does not match with the syntax of the payload
      // to solve the above issue; -> we need to parse the things like the object formats ;
      // i mean by the object.entries
      //

      //
      //it also tells that only show the collections/ products which are approved by the admin
      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "products",
        where: {
          approvedForSale: {
            equals: "approved",
          },
          ...parsedQueryOpts,
        },
        sort,
        depth: 1,
        limit,
        page,
      });

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
});

export type AppRouter = typeof appRouter;
