import { db } from '@/lib/db';

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    return await db.verificationToken.findFirst({
      where: { email },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    return await db.verificationToken.findFirst({
      where: { token },
    });
  } catch (error) {
    console.error(error);
  }
};
