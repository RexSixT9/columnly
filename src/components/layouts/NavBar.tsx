import { NavLink } from 'react-router';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blogs' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
] as const;

export const NavBar = ({
  className,
  ...props
}: React.ComponentProps<'nav'>) => {
  return (
    <nav
      className={cn(className)}
      aria-label='Main Navigation'
      {...props}
    >
      <ul className='flex flex-col gap-y-2 gap-x-1 md:flex-row md:items-center'>
        {NAV_LINKS.map((link) => (
          <li key={link.path}>
            <Button
              variant='ghost'
              asChild
              className='max-md:w-full max-md:justify-start'
            >
              <NavLink
                to={link.path}
                className='nav-link'
                viewTransition
              >
                {link.name}
              </NavLink>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
