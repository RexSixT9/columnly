import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
import { EyeClosedIcon, EyeIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type InputPasswordProps = Omit<React.ComponentProps<'input'>, 'type'>;

export const InputPassword: React.FC<InputPasswordProps> = ({
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative'>
      <Input
        {...props}
        autoComplete='current-password'
        type={showPassword ? 'text' : 'password'}
        className={cn(
          'pe-12 placeholder:tracking-normal',
          !showPassword && 'tracking-widest',
          className,
        )}
      />
      <Toggle
        className='absolute top-1/2 -translate-y-1/2 right-0.5 size-8'
        type='button'
        pressed={showPassword}
        onPressedChange={setShowPassword}
      >
        {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
      </Toggle>
    </div>
  );
};
