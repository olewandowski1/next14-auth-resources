import { UserRole } from '@prisma/client';
import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(1, {
    message: 'Please enter a password.',
  }),
  code: z.optional(z.string()),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'E-mail is required.',
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Please enter a password. At least 6 characters long.',
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Please enter a password. At least 6 characters long.',
  }),
  name: z.string().min(1, {
    message: 'Please enter your name.',
  }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(
      z.string().min(3, { message: 'Name must be at least 3 characters long.' })
    ),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: 'Please enter your new password.',
      path: ['newPassword'],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: 'Please enter your current password.',
      path: ['password'],
    }
  );
