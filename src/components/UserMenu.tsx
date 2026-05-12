import { Link } from 'react-router';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import SettingsDialog from './SettingsDialog';
import Avatar from 'react-avatar';

import { useUser } from '@/hooks/useUser';
import { LayoutDashboardIcon, LogOutIcon, SettingsIcon } from 'lucide-react';
import { useLogout } from '@/hooks/useLogout';

const UserMenu = () => {
  const user = useUser();
  const logout = useLogout();

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
          >
            <Avatar
              name={user?.email}
              size='36'
              className='rounded-md'
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='min-w-56'
          align='end'
        >
          <DropdownMenuLabel className='p-0 font-normal'>
            <div className='flex items-center gap-2 px-1 py-1 text-left text-sm'>
              <Avatar
                email={user.email}
                size='32'
                className='rounded-lg'
              />
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <div className='truncate font-medium'>{user.username}</div>
                <div className='truncate text-xs text-muted-foreground'>
                  {user.email}
                </div>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {user.role === 'admin' && (
              <DropdownMenuItem asChild>
                <Link
                  to='/admin/dashboard'
                  viewTransition
                >
                  <LayoutDashboardIcon className='me-2' />
                  Dashboard
                </Link>
              </DropdownMenuItem>
            )}
            <SettingsDialog>
              <DropdownMenuItem asChild>
                <Link to='/settings'>
                  <SettingsIcon className='me-2' />
                  Settings
                </Link>
              </DropdownMenuItem>
            </SettingsDialog>
            <DropdownMenuItem onClick={logout}>
              <LogOutIcon className='me-2' />
              Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};

export default UserMenu;
