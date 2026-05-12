import { Link } from 'react-router';
import { useState } from 'react';

import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { MenuIcon, XIcon } from 'lucide-react';
import Logo from './layouts/Logo';
import { NavBar } from './layouts/NavBar';
import { useUser } from '@/hooks/useUser';
import { ThemeToggle } from './ThemeToggle';
import UserMenu from './UserMenu';

export const Header = ({
  className,
  ...props
}: React.ComponentProps<'header'>) => {
  const user = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <header
      {...props}
      className={cn(
        'border-b fixed top-0 left-0 w-full h-16 grid items-center bg-background z-40 ',
        className,
      )}
    >
      <div className='container py-3 flex items-center gap-4'>
        <Logo />
        <Button
          variant='outline'
          className='ml-auto md:hidden'
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label='Toggle Menu'
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <XIcon /> : <MenuIcon />}
        </Button>
        <div
          className={cn(
            'grow max-md:absolute max-md:top-16 max-md:left-0 max-md:bg-background max-md:w-full max-md:border-b md:flex md:justify-between md:items-center',
            !isMenuOpen && 'max-md:hidden',
          )}
        >
          <NavBar className='max-md:p-3 md:ms-4' />

          {!user && (
            <>
              <Separator className='md:hidden' />
              <div className='flex flex-col-reverse gap-y-3 gap-x-2 md:flex-row md:items-center max-md:p-3'>
                <Button
                  variant='outline'
                  asChild
                >
                  <Link
                    to='/login'
                    viewTransition
                  >
                    Login
                  </Link>
                </Button>
                <Button
                  variant='default'
                  asChild
                >
                  <Link
                    to='/login'
                    viewTransition
                  >
                    Get Started
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
        <div className='flex items-center gap-1 ms-auto'>
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
