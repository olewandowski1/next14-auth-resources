'use client';

import { useState, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { settings } from '@/actions/settings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SettingsSchema } from '@/schemas';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCurrentUser } from '@/hooks/use-current-user';
import FormSuccess from '@/components/form-success';
import FormError from '@/components/form-error';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserRole } from '@prisma/client';

const SettingsPage = () => {
  const user = useCurrentUser();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      role: user?.role || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((response) => {
          if (response.error) {
            setError(response.error);
          }

          if (response.success) {
            setSuccess(response.success);
            update();
          }
        })
        .catch(() => {
          setError('Something went wrong');
        });
    });
  };

  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'> Settings </p>
      </CardHeader>
      <CardContent className='space-y-6'>
        <Form {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='John Doe'
                    />
                  </FormControl>
                  <FormDescription> Enter a new name </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Role </FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a Role' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={UserRole.ADMIN}> Admin </SelectItem>
                      <SelectItem value={UserRole.USER}> User </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <FormDescription> Select a new role </FormDescription>
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full'>
              Save
            </Button>
          </form>
        </Form>
        <FormSuccess message={success} />
        <FormError message={error} />
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
