/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { Link, useFetcher, useNavigate } from 'react-router';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldLabel,
  FieldGroup,
} from '@/components/ui/field';

import { loginBanner } from '@/assets';
import { Loader } from 'lucide-react';

import type { ActionResponse, AuthResponse, ValidationError } from '@/types';
import { InputPassword } from './InputPassword';

type LoginFieldName = 'email' | 'password';

const LOGIN_FORM = {
  title: 'Welcome back',
  description: 'Enter your email and password to sign in to your account',
  submitButton: 'Sign In',
  footerText: "Don't have an account?",
} as const;

const formSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Email is required' })
    .max(60, { message: 'Email must be at most 60 characters' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .nonempty({ message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export const LoginForm = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const loginResponse = fetcher.data as ActionResponse<AuthResponse>;

  const isLoading = fetcher.state !== 'idle';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = useCallback(async (value: z.infer<typeof formSchema>) => {
    console.log('Submitting form with data:', value);
  }, []);

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form
            id='login-form'
            className='p-6 md:p-8'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-center text-center'>
                <h1 className='text-2xl font-semibold'>{LOGIN_FORM.title}</h1>
                <p className='text-muted-foreground text-balance'>
                  {LOGIN_FORM.description}
                </p>
              </div>
              <FieldGroup>
                <Controller
                  control={form.control}
                  name='email'
                  render={({ field, fieldState }) => (
                    <Field
                      className='grid gap-3'
                      aria-invalid={fieldState.invalid}
                    >
                      <FieldLabel htmlFor='form-email'>Email</FieldLabel>
                      <Input
                        {...field}
                        id='form-email'
                        placeholder='you@example.com'
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
                  name='password'
                  render={({ field, fieldState }) => (
                    <Field
                      className='grid gap-3'
                      aria-invalid={fieldState.invalid}
                    >
                      <FieldLabel>Password</FieldLabel>
                      <InputPassword
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder='********'
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <Button
                type='submit'
                disabled={isLoading}
                className='w-full'
              >
                {isLoading ? (
                  <Loader className='animate-spin' />
                ) : (
                  LOGIN_FORM.submitButton
                )}
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              {LOGIN_FORM.footerText}{' '}
              <Link
                to='/signup'
                className='text-primary hover:underline underline-offset-4'
                viewTransition
              >
                Sign Up
              </Link>
            </div>
          </form>
          <figure className='bg-muted relative hidden md:block'>
            <img
              src={loginBanner}
              width={400}
              height={400}
              alt='Login Banner'
              className='absolute inset-0 w-full h-full object-cover'
            />
          </figure>
        </CardContent>
      </Card>
      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
        By clicking continue , you agree to our{' '}
        <a
          href='/terms'
          target='_blank'
          rel='noopener noreferrer'
        >
          Terms of Service
        </a>{' '}
        and{' '}
        <a
          href='/privacy'
          target='_blank'
          rel='noopener noreferrer'
        >
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
};
