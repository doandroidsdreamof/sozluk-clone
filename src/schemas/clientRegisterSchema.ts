import * as z from "zod";

export const clientRegisterSchema = z
  .object({
    userName: z
      .string({
        required_error: "User name is required",
      })
      .min(6, {
        message: "User name must contain at least 6 character",
      }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, {
        message: "Password name must contain at least 6 character",
      }),
    confirmPassword: z
      .string({
        required_error: "Password is required",
      })
      .min(6, {
        message: "Password name must contain at least 6 character",
      }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["password"],
      });
    }
  });