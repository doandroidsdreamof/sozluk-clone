import * as z from "zod";
import { SCHEMA_ERROR_MESSAGES } from "~/constants/staticContents";

export const emailSchema = z.object({
  email: z
    .string({
      required_error: SCHEMA_ERROR_MESSAGES.EMAIL_REQUIRED,
    })
    .email(),
});
