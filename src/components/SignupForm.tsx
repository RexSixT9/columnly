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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

import { signupBanner } from '@/assets';
import { Loader } from 'lucide-react';

import type {
  ActionResponse,
  AuthResponse,
  ErrorResponse,
  ValidationError,
} from '@/types';
import { InputPassword } from './InputPassword';
import { Label } from './ui/label';

type signupField = 'email' | 'password' | 'role';

const SIGNUP_FORM = {
  title: 'Create an account',
  description: 'Enter your email and password to create an account',
  submitButton: 'Sign Up',
  footerText: 'Already have an account?',
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
  role: z.enum(['user', 'admin'], { message: 'Role is required' }),
});

export const SignupForm = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const signupResponse = fetcher.data as ActionResponse<AuthResponse>;

  const isLoading = fetcher.state !== 'idle';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'user',
    },
  });

  useEffect(() => {
    if (!signupResponse) return;

    if (signupResponse.ok) {
      navigate('/', { viewTransition: true });
      return;
    }

    if (!signupResponse.err) return;

    if (signupResponse.err.code === 'AuthorizationError') {
      const authorizationError = signupResponse.err as ErrorResponse;

      toast.error(authorizationError.message);
    }

    if (signupResponse.err.code === 'ValidationError') {
      const validationError = signupResponse.err as ValidationError;

      Object.entries(validationError.errors).forEach((value) => {
        const [, validationError] = value;
        const signupField = validationError.path as signupField;

        form.setError(
          signupField,
          {
            type: 'custom',
            message: validationError.msg,
          },
          { shouldFocus: true },
        );
      });
    }
  }, [signupResponse, form, navigate]);

  const onSubmit = useCallback(
    async (value: z.infer<typeof formSchema>) => {
      await fetcher.submit(value, {
        method: 'post',
        action: '/signup',
        encType: 'application/json',
      });
    },
    [fetcher],
  );

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
            <div className='flex flex-col gap-6 justify-center'>
              <div className='flex flex-col items-center text-center'>
                <h1 className='text-2xl font-semibold'>{SIGNUP_FORM.title}</h1>
                <p className='text-muted-foreground px-6'>
                  {SIGNUP_FORM.description}
                </p>
              </div>
              <FieldGroup>
                <Controller
                  control={form.control}
                  name='role'
                  render={({ field }) => (
                    <Field className='grid gap-3'>
                      <FieldLabel>Register as</FieldLabel>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className='grid grid-cols-2 gap-0 border border-input rounded-md p-0.5'
                      >
                        <Label
                          htmlFor='user'
                          className='flex h-9 cursor-pointer items-center justify-center rounded-s-sm text-muted-foreground hover:text-foreground has-checked:bg-secondary has-checked:text-secondary-foreground'
                        >
                          <span className='absolute w-0 h-0 overflow-hidden'>
                            <RadioGroupItem
                              value='user'
                              id='user'
                            />
                          </span>
                          User
                        </Label>

                        <Label
                          htmlFor='admin'
                          className='flex h-9 cursor-pointer items-center justify-center rounded-e-sm text-muted-foreground hover:text-foreground has-checked:bg-secondary has-checked:text-secondary-foreground'
                        >
                          <span className='absolute w-0 h-0 overflow-hidden'>
                            <RadioGroupItem
                              value='admin'
                              id='admin'
                            />
                          </span>
                          Admin
                        </Label>
                      </RadioGroup>
                    </Field>
                  )}
                />
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
                  SIGNUP_FORM.submitButton
                )}
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              {SIGNUP_FORM.footerText}{' '}
              <Link
                to='/login'
                className='text-primary hover:underline underline-offset-4'
                viewTransition
              >
                Sign In
              </Link>
            </div>
          </form>
          <figure className='bg-muted relative hidden md:block'>
            <img
              src={signupBanner}
              width={400}
              height={400}
              alt='Signup Banner'
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
