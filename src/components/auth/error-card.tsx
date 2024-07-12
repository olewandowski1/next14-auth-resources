import CardWrapper from '@/components/auth/card-wrapper';
import { FaExclamation } from 'react-icons/fa';

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel='Oops! Something went wrong...'
      backButtonHref='/auth/login'
      backButtonLabel='Back to Login Page'
    >
      <div className='w-full flex justify-center items-center'>
        <FaExclamation className='w-12 h-12 text-destructive' />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
