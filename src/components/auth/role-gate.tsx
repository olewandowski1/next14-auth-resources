'use client';

import { useCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@prisma/client';
import FormError from '@/components/form-error';

type RoleGateProps = {
  children: React.ReactNode;
  allowedRole: UserRole;
};

const RoleGate: React.FC<RoleGateProps> = ({ children, allowedRole }) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message='You do not have a permission to view this content!' />
    );
  }

  return <> {children} </>;
};

export default RoleGate;
