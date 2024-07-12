import LoginButton from '@/components/auth/login-button';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';

const fontPoppins = Poppins({ subsets: ['latin'], weight: '500' });

const HomePage = () => {
  return (
    <main className='flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400 to-emerald-900'>
      <div className='space-y-4 text-center text-white'>
        <h1
          className={cn(
            'text-5xl font-semibold drop-shadow-sm',
            fontPoppins.className
          )}
        >
          🔑 Auth Resources
        </h1>
        <p className='text-md italic'> Reusable Auth Resources </p>
        <div>
          <LoginButton mode='modal' asChild>
            <Button variant='secondary'> Login </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
