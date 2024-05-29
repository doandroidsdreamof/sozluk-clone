import * as z from "zod";
import { SCHEMA_ERROR_MESSAGES } from "~/constants/staticContents";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: SCHEMA_ERROR_MESSAGES.EMAIL_REQUIRED,
    })
    .email(),
  password: z
    .string({
      required_error: SCHEMA_ERROR_MESSAGES.PASSWORD_REQUIRED,
    })
    .min(6),
});

export type ISignin = z.infer<typeof loginSchema>;
