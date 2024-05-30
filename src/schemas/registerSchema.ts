import * as z from "zod";
import { SCHEMA_ERROR_MESSAGES } from "@/constants/staticContents";

export const registerSchema = z.object({
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
  userName: z.string({
    required_error: SCHEMA_ERROR_MESSAGES.USER_NAME_REQUIRED,
  }),
});

export type ISignUp = z.infer<typeof registerSchema>;
