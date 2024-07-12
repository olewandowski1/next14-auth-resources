'use client';

import * as z from 'zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import CardWrapper from '@/components/auth/card-wrapper';
import { RegisterSchema } from '@/schemas';
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
import { register } from '@/actions/register';
import FormSuccess from '../form-success';
import FormError from '../form-error';

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const registerForm = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      register(data).then((response) => {
        if ('error' in response) {
          setError(response.error);
        } else {
          setSuccess(response.success);
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel='Create an Account'
      backButtonLabel='Already have an account?'
      backButtonHref='/auth/login'
      showSocial
    >
      <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <FormField
              control={registerForm.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='John Doe'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
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
              control={registerForm.control}
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button type='submit' className='w-full' disabled={isPending}>
            Sign Up
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
