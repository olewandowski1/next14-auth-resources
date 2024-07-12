'use server';

import { currentRole } from '@/lib/auth';
import { UserRole } from '@prisma/client';

export const admin = async () => {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return { error: 'You are not authorized to access this resource.' };
  }

  return { message: 'You are authorized to access this resource.' };
};
