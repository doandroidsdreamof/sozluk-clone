import * as z from "zod";

export const emailSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
});
