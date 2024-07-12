'use client';

import * as z from 'zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import CardWrapper from '@/components/auth/card-wrapper';
import { NewPasswordSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { newPassword } from '@/actions/new-password';

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const newPasswordForm = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof NewPasswordSchema>) => {
    setError('');

    startTransition(() => {
      newPassword(data, token).then((response) => {
        setError(response?.error);
        setSuccess(response?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel='Enter a New Password'
      backButtonLabel='Back To Login'
      backButtonHref='/auth/login'
    >
      <Form {...newPasswordForm}>
        <form
          onSubmit={newPasswordForm.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-2'>
            <FormField
              control={newPasswordForm.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Password </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='******'
                      type='password'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button type='submit' className='w-full' disabled={isPending}>
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
