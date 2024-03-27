// this is the basic schema to create user
// it is used in the sign up page and the create payload user
import { z } from "zod";

//schema form
export const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

// type of the credentials
export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;
