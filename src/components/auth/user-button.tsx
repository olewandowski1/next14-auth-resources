'use client';

import { UserCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useCurrentUser } from '@/hooks/use-current-user';
import LogoutButton from '@/components/auth/logout-button';
import { LogOut } from 'lucide-react';

const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className='bg-primary shadow-md'>
            <UserCircle className='text-white' />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-32' align='end'>
        <LogoutButton>
          <DropdownMenuItem>
            <LogOut className='h-4 w-4 mr-2' />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
