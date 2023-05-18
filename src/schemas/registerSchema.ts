import * as z from "zod";

export const registerSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6),
  userName: z.string({
    required_error: "userName name is required",
  }),
});

export type ISignUp = z.infer<typeof registerSchema>;