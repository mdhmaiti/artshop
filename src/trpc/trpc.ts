import { User } from "@/payload-types";
import { ExpressContext } from "@/server";
import { TRPCError, initTRPC } from "@trpc/server";
import { PayloadRequest } from "payload/types";

// the ExpressContext gives the types for the req and the res
// here it is actually creating a context for the ExpressContext type
const t = initTRPC.context<ExpressContext>().create();

const middleware = t.middleware;
// this middleware comes from the trpc and is used to check if the user is authenticated or not;
// it is used for the protected routes,
const isAuth = middleware(async ({ ctx, next }) => {
  const req = ctx.req as PayloadRequest;
  // the payload request is a native type for the payload;

  const { user } = req as { user: User | null };
  // paylaod is getting the user from the collection of users; it is in the collection folder

  // if there is no user in the db return unauthorized
  if (!user || !user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
// the auth middleware is always a private method
export const privateProcedure = t.procedure.use(isAuth);
