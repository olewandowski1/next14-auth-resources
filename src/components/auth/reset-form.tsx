'use client';

import * as z from 'zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import CardWrapper from '@/components/auth/card-wrapper';
import { ResetSchema } from '@/schemas';
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
import { reset } from '@/actions/reset';

const ResetForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const resetForm = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: z.infer<typeof ResetSchema>) => {
    setError('');

    startTransition(() => {
      reset(data).then((response) => {
        setError(response?.error);
        setSuccess(response?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel='Forgot your password?'
      backButtonLabel='Back To Login'
      backButtonHref='/auth/login'
    >
      <Form {...resetForm}>
        <form onSubmit={resetForm.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-2'>
            <FormField
              control={resetForm.control}
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
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button type='submit' className='w-full' disabled={isPending}>
            Send Reset E-mail
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
