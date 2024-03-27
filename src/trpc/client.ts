// here the AppRouter type is a generic which contains the entire backend
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "./";

export const trpc = createTRPCReact<AppRouter>({});
