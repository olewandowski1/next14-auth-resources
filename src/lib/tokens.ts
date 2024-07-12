import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { getVerificationTokenByEmail } from '@/data/verification-token';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { db } from '@/lib/db';

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expiresAt = new Date(new Date().getTime() + 1000 * 60 * 60);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  return await db.verificationToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expiresAt = new Date(new Date().getTime() + 1000 * 60 * 60);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  return await db.passwordResetToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expiresAt = new Date(new Date().getTime() + 1000 * 60 * 5);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  return await db.twoFactorToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });
};
