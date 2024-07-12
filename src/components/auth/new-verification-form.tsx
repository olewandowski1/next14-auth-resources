'use client';

import { useCallback, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import CardWrapper from '@/components/auth/card-wrapper';
import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/actions/new-verification';
import FormSuccess from '@/components/form-success';
import FormError from '@/components/form-error';

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Token is required');
      return;
    }

    newVerification(token)
      .then((response) => {
        setError(response.error);
        setSuccess(response.success);
      })
      .catch(() => {
        setError('An error occurred! Please try again.');
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <CardWrapper
      headerLabel='Please confirm your e-mail address'
      backButtonLabel='Back'
      backButtonHref='/auth/login'
    >
      <div className='flex items-center w-full justify-center'>
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
