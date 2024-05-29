import * as z from "zod";
import { SCHEMA_ERROR_MESSAGES } from "~/constants/staticContents";

export const clientRegisterSchema = z
  .object({
    userName: z
      .string({
        required_error: SCHEMA_ERROR_MESSAGES.USER_NAME_REQUIRED,
      })
      .min(6, {
        message: SCHEMA_ERROR_MESSAGES.USER_NAME_MIN_LENGTH,
      }),
    password: z
      .string({
        required_error: SCHEMA_ERROR_MESSAGES.PASSWORD_REQUIRED,
      })
      .min(6, {
        message: SCHEMA_ERROR_MESSAGES.PASSWORD_MIN_LENGTH,
      }),
    confirmPassword: z
      .string({
        required_error: SCHEMA_ERROR_MESSAGES.PASSWORD_REQUIRED,
      })
      .min(6, {
        message: SCHEMA_ERROR_MESSAGES.PASSWORD_MIN_LENGTH,
      }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: SCHEMA_ERROR_MESSAGES.PASSWORDS_MUST_MATCH,
        path: ["password"],
      });
    }
  });
