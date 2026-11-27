import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Use at least 8 characters.")
  .max(72, "Use no more than 72 characters.")
  .refine((password) => new TextEncoder().encode(password).length <= 72, {
    message: "Password must be 72 bytes or fewer.",
  });

export const emailSchema = z.string().trim().email("Enter a valid email address.").max(254).transform((email) => email.toLowerCase());

export const credentialsSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registrationSchema = z.object({
  email: emailSchema,
  adultConfirmed: z.boolean().refine((value) => value, "Confirm that you are 18 or older."),
}).strict();

export const verifyEmailPasswordSchema = z
  .object({ password: passwordSchema, passwordConfirmation: z.string() })
  .refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "Passwords do not match.",
  });

export const verificationTokenSchema = z.string().regex(/^[A-Za-z0-9_-]{43}$/);
