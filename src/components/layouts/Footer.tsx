import { cn } from '@/lib/utils';

import Logo from './Logo';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { IconBrandGithub, IconBrandInstagram } from '@tabler/icons-react';
import React from 'react';

const SOCIAL_LINKS = [
  {
    url: 'https://github.com',
    Icon: IconBrandGithub,
    label: 'GitHub',
  },
  {
    url: 'https://www.instagram.com',
    Icon: IconBrandInstagram,
    label: 'Instagram',
  },
];

export const Footer = ({
  className,
  ...props
}: React.ComponentProps<'footer'>) => {
  return (
    <footer
      className={cn('border-t', className)}
      {...props}
    >
      <div className='container py-8 grid max-md:justify-items-center md:grid-cols-[1fr_3fr_1fr] md:items-center'>
        <Logo />
        <p className='text-sm text-muted-foreground order-1 max-md:text-center md:order-0 md:justify-self-center'>
          &copy; {new Date().getFullYear()} Columnly. All rights reserved.
        </p>
        <ul className='flex items-center gap-1 max-md:mt-6 max-md:mb-4 md:justify-self-end '>
          {SOCIAL_LINKS.map(({ label, url, Icon }) => (
            <li key={label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    aria-label={label}
                    asChild
                    variant='ghost'
                    size='icon'
                  >
                    <a
                      href={url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Icon />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <label>{label}</label>
                </TooltipContent>
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
