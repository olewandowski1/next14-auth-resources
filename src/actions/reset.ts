'use server';

import * as z from 'zod';
import { ResetSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';

export const reset = async (data: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Invalid e-mail address' };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: 'E-mail not found. Please try again.' };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: 'Reset link sent!' };
};
