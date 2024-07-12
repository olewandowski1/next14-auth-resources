import Navbar from '@/components/protected/navbar';
import { auth } from '@@/auth';
import { SessionProvider } from 'next-auth/react';

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

const ProtectedLayout: React.FC<ProtectedLayoutProps> = async ({
  children,
}) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className='h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400 to-emerald-900'>
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
};

export default ProtectedLayout;
