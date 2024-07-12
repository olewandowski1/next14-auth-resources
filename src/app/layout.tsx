import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Auth Resources',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
