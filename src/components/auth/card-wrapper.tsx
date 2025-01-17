'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Header from '@/components/auth/header';
import Social from '@/components/auth/social';
import BackButton from '@/components/auth/back-button';

type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}) => {
  return (
    <Card className='w-[400px] shadow-md'>
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent> {children} </CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel}></BackButton>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
