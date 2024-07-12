import { X } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import { ExtendedUser } from '@@/next-auth';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

type UserInfoProps = {
  user?: ExtendedUser;
  label: string;
};

const UserInfo: React.FC<UserInfoProps> = ({ user, label }) => {
  return (
    <Card className='shadow-md w-[600px]'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'> {label} </p>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
          <p className='text-sm font-medium'> ID </p>
          <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>
            {user?.id}
          </p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
          <p className='text-sm font-medium'> E-mail </p>
          <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>
            {user?.email}
          </p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
          <p className='text-sm font-medium'> Name </p>
          <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>
            {user?.name}
          </p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
          <p className='text-sm font-medium'> Role </p>
          <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>
            {user?.role}
          </p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
          <p className='text-sm font-medium'> Two Factor Auth </p>
          {user?.isTwoFactorEnabled ? (
            <FaCheck className='text-green-500' />
          ) : (
            <X className='text-red-500' />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
