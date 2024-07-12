import { db } from '@/lib/db';

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    return await db.passwordResetToken.findUnique({
      where: { token },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    return await db.passwordResetToken.findFirst({
      where: { email },
    });
  } catch (error) {
    console.error(error);
  }
};
