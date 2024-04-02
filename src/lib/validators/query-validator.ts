// this is the schema for the validator to fetch the infinite products;
// it also arranges the products
import { z } from "zod";

export const QueryValidator = z.object({
  category: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  limit: z.number().optional(),
});

export type TQueryValidator = z.infer<typeof QueryValidator>;
