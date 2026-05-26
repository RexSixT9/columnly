import { Link, useLocation, useNavigate } from 'react-router';
import { cn } from '@/lib/utils';

import { SidebarTrigger } from './ui/sidebar';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';

import { PlusIcon } from 'lucide-react';
import { AppBreadcrumbs } from './AppBreadcrumbs';
import { TopBarProgress } from './TopBarProgress';

const TopAppBar = ({ className, ...props }: React.ComponentProps<'header'>) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoading = navigation.state === 'loading';

  return (
    <header
      {...props}
      className={cn(
        'relative flex h-16 shrink-0 items-center gap-2 px-4',
        className,
      )}
    >
      <div className='flex items-center gap-2'>
        <SidebarTrigger />
        <Separator
          orientation='vertical'
          className='mr-2 data-[orientation=vertical]:h-4'
        />
        <AppBreadcrumbs />
      </div>

      <div className='flex items-center gap-2 ms-auto'>
        {location.pathname !== '/admin/blogs/create' && (
          <Button asChild>
            <Link
              to='/admin/blogs/create'
              viewTransition
            >
              <PlusIcon className='me-1' />
              Create Blog
            </Link>
          </Button>
        )}

        <ThemeToggle />
      </div>

      {isLoading && <TopBarProgress />}
    </header>
  );
};

export default TopAppBar;
