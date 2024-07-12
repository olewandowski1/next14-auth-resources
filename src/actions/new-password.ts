'use server';

import * as z from 'zod';
import { NewPasswordSchema } from '@/schemas';
import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export const newPassword = async (
  data: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: 'Token is missing' };
  }

  const validatedFields = NewPasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Invalid password' };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: 'Invalid token' };
  }

  const isTokenExpired = new Date(existingToken.expiresAt) < new Date();

  if (isTokenExpired) {
    return { error: 'Token has expired' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'E-mail does not exist' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  return { success: 'Password updated successfully!' };
};
