'use client';

import * as z from 'zod';
import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import CardWrapper from '@/components/auth/card-wrapper';
import { LoginSchema } from '@/schemas';
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
import { login } from '@/actions/login';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import Link from 'next/link';

const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'You have already used other login method.'
      : '';
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const loginForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    setError('');

    startTransition(() => {
      login(data)
        .then((response) => {
          if (response?.error) {
            loginForm.reset();
            setError(response.error);
          }

          if (response?.success) {
            loginForm.reset();
            setSuccess(response.success);
          }

          if (response?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => {
          setError('An error occurred. Please try again later.');
        });
    });
  };

  return (
    <CardWrapper
      headerLabel='Welcome Back'
      backButtonLabel="Don't have an account?"
      backButtonHref='/auth/register'
      showSocial
    >
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-2'>
            {!showTwoFactor ? (
              <>
                <FormField
                  control={loginForm.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> E-mail Address </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='simple-email@example.com'
                          type='email'
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Password </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='password'
                          placeholder='******'
                          disabled={isPending}
                        />
                      </FormControl>
                      <Button
                        size='sm'
                        variant='link'
                        asChild
                        className='p-0 m-0 font-normal text-muted-foreground text-xs'
                      >
                        <Link href='/auth/forgot-password'>
                          Forgot Password?
                        </Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <FormField
                control={loginForm.control}
                name='code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Two Factor Code </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='123456'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <FormSuccess message={success} />
          <FormError message={error || urlError} />
          <Button type='submit' className='w-full' disabled={isPending}>
            {showTwoFactor ? 'Confirm' : 'Login'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
