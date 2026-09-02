import z from "zod";

export interface CustomJwtSessionClaims {
    metadata?: {
        role?: "user"| "admin"
    }
}

export const UserFormSchema = z.object({
  firstName: z
    .string({message:"First name is required!"})
    .min(2, { error: "First name must be at least 2 characters!" })
    .max(50),
  lastName: z
    .string({message:"Last name is required!"})
    .min(2, { error: "Last name must be at least 2 characters!" })
    .max(50),
username: z
    .string({message:"Username is required!"})
    .min(2, { error: "Username must be at least 2 characters!" }),
  emailAddress: z.array(z.string({message:"Email address is required!"})),
  password: z
  .string({message:"Password is required!"})
  .min(6, { error: "Password must be at least 6 characters!" })
  .max(50),
});
