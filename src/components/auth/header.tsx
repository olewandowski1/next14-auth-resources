import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: '600',
});

type HeaderProps = {
  label: string;
};

const Header: React.FC<HeaderProps> = ({ label }) => {
  return (
    <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
      <h1
        className={cn(
          'text-3xl font-semibold drop-shadow-sm',
          fontPoppins.className
        )}
      >
        🔑 Auth Resources
      </h1>
      <p className='text-muted-foreground text-sm'> {label} </p>
    </div>
  );
};

export default Header;
