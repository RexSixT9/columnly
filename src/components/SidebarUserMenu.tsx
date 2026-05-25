import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from './ui/sidebar';
import SettingsDialog from './SettingsDialog';
import Avatar from 'react-avatar';

import { useUser } from '@/hooks/useUser';
import { useLogout } from '@/hooks/useLogout';

import { ChevronsUpDownIcon, LogOutIcon, SettingsIcon } from 'lucide-react';

const SidebarUserMenu = () => {
  const { isMobile } = useSidebar();
  const user = useUser();
  const logout = useLogout();

  if (user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              >
                <Avatar
                  name={user.email}
                  size='32'
                  className='rounded-lg'
                />
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <div className='truncate font-medium'>{user.username}</div>
                  <div className='truncate text-xs text-muted-foreground'>
                    {user.email}
                  </div>
                </div>
                <ChevronsUpDownIcon className='ml-auto size-4' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
              side={isMobile ? 'bottom' : 'right'}
              align='end'
              sideOffset={4}
            >
              <DropdownMenuLabel className='p-0 font-normal'>
                <div className='flex items-center gap-2 px-1 py-1 text-left text-sm'>
                  <Avatar
                    name={user.email}
                    size='32'
                    className='rounded-md'
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
                <SettingsDialog>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <SettingsIcon className='me-2' /> Settings
                  </DropdownMenuItem>
                </SettingsDialog>
                <DropdownMenuItem onClick={logout}>
                  <LogOutIcon className='me-2' />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }
};

export default SidebarUserMenu;
