'use server';

import * as z from 'zod';
import { RegisterSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Register failed! Check credentials' };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 12);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'User already exists!' };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'Confirmation email is sent!' };
};
