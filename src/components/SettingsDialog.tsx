import React from 'react';
import { useCallback } from 'react';
import { useFetcher } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { InputPassword } from './InputPassword';

import { cn } from '../lib/utils';
import { useUser } from '@/hooks/useUser';
import {
  AtSignIcon,
  LoaderIcon,
  MailIcon,
} from 'lucide-react';

import type { DialogProps } from '@radix-ui/react-dialog';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';

const profileFormSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: 'First name must be at most 20 characters' }),
  lastName: z
    .string()
    .max(20, { message: 'Last name must be at most 20 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  username: z
    .string()
    .max(20, { message: 'Username must be at most 20 characters' }),
});

const passwordFormSchema = z
  .object({
    password: z
      .string()
      .nonempty({ message: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Please confirm your new password' })
      .nonempty({ message: 'Please confirm your new password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const ProfileSettingsForm = () => {
  const user = useUser();
  const fetcher = useFetcher();

  const loading = fetcher.state !== 'idle' && Boolean(fetcher.formData);

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: user?.email,
    username: user?.username,
  };

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof profileFormSchema>) => {
      console.log('Submitting profile data:', data);
    },
    [],
  );

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='space-y-6'
    >
      <div>
        <h3 className='font-semibold'>Profile Settings</h3>
        <p className='text-sm text-muted-foreground'>
          Update your profile information.
        </p>
        <Separator className='my-5' />
      </div>
      <div className='grid gap-4 items-start lg:grid-cols-[1fr_2fr]'>
        <div
          className={cn(
            'text-sm leading-none font-medium',
            (form.formState.errors.firstName ||
              form.formState.errors.lastName) &&
              'text-destructive',
          )}
        >
          Name
        </div>
        <div className='grid gap-4 md:grid-cols-2'>
          <Controller
            control={form.control}
            name='firstName'
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor='form-first-name'
                  className='md:sr-only'
                >
                  First Name
                </FieldLabel>
                <Input
                  type='text'
                  {...field}
                  id='form-first-name'
                  aria-invalid={fieldState.invalid}
                  placeholder='John'
                  autoComplete='off'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name='lastName'
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor='form-last-name'
                  className='md:sr-only'
                >
                  Last Name
                </FieldLabel>
                <Input
                  {...field}
                  type='text'
                  id='form-last-name'
                  aria-invalid={fieldState.invalid}
                  placeholder='Doe'
                  autoComplete='off'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </div>
      <Separator className='my-5' />
      <Controller
        defaultValue={user?.email}
        control={form.control}
        name='email'
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            className='grid gap-2 items-start lg:grid-cols-[1fr_2fr]'
          >
            <FieldLabel htmlFor='form-email'>Email</FieldLabel>
            <div className='space-y-2'>
              <div className='relative'>
                <MailIcon
                  className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none'
                  size={20}
                />
                <Input
                  {...field}
                  type='email'
                  id='form-email'
                  aria-invalid={fieldState.invalid}
                  placeholder='john.doe@example.com'
                  autoComplete='off'
                  className='ps-10'
                />
              </div>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Separator className='my-5' />
      <Controller
        defaultValue={user?.username}
        control={form.control}
        name='username'
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            className='grid gap-2 items-start lg:grid-cols-[1fr_2fr]'
          >
            <FieldLabel htmlFor='form-username'>Username</FieldLabel>
            <div className='space-y-2'>
              <div className='relative'>
                <AtSignIcon
                  className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none'
                  size={20}
                />
                <Input
                  {...field}
                  type='text'
                  id='form-username'
                  aria-invalid={fieldState.invalid}
                  placeholder='john.doe'
                  autoComplete='off'
                  className='ps-10'
                />
              </div>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Separator className='my-5' />
      <div className='flex justify-end gap-3'>
        <Button
          variant='outline'
          asChild
        >
          <DialogClose>Cancel</DialogClose>
        </Button>

        <Button
          type='submit'
          disabled={loading}
        >
          {loading && <LoaderIcon className='animate-spin' />}
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
};

const PasswordSettingsForm = () => {
  const fetcher = useFetcher();
  const loading = fetcher.state !== 'idle' && Boolean(fetcher.formData);

  const form = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof passwordFormSchema>) => {
      await fetcher.submit(data, {
        method: 'post',
        action: '/settings',
        encType: 'application/json',
      });
    },
    [fetcher],
  );

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div>
        <h3 className='font-semibold'>Password Settings</h3>
        <p className='text-sm text-muted-foreground'>
          Update your account password.
        </p>
        <Separator className='my-5' />
      </div>

      <Controller
        control={form.control}
        name='password'
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            className='grid gap-2 items-start lg:grid-cols-[1fr_2fr]'
          >
            <FieldLabel>New Password</FieldLabel>
            <div className='space-y-2'>
              <InputPassword
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder='••••••••'
              />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Separator className='my-5' />
      <Controller
        control={form.control}
        name='confirmPassword'
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            className='grid gap-2 items-start lg:grid-cols-[1fr_2fr]'
          >
            <FieldLabel>Confirm Password</FieldLabel>
            <div className='space-y-2'>
              <InputPassword
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder='••••••••'
              />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Separator className='my-5' />
      <div className='flex justify-end gap-3'>
        <Button
          variant='outline'
          asChild
        >
          <DialogClose>Cancel</DialogClose>
        </Button>

        <Button
          type='submit'
          disabled={loading}
        >
          {loading && <LoaderIcon className='animate-spin' />}
          {loading ? 'Updating...' : 'Update Changes'}
        </Button>
      </div>
    </form>
  );
};

const SettingsDialog = ({
  children,
  ...props
}: React.PropsWithChildren<DialogProps>) => {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='md:min-w-[80vw] xl:min-w-4xl'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Settings</DialogTitle>
        </DialogHeader>
        <Tabs
          defaultValue='profile'
          className='gap-5'
        >
          <TabsList className='w-full'>
            <TabsTrigger value='profile'>Profile</TabsTrigger>
            <TabsTrigger value='password'>Password</TabsTrigger>
          </TabsList>
          <TabsContent value='profile'>
            <ProfileSettingsForm />
          </TabsContent>
          <TabsContent value='password'>
            <PasswordSettingsForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
