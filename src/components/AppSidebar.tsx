import { Link, useLocation } from 'react-router';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from './ui/sidebar';
import Logo from '@/components/layouts/Logo';

import {
  LayoutDashboardIcon,
  TextIcon,
  MessageSquareIcon,
  UserIcon,
} from 'lucide-react';
import SidebarUserMenu from './SidebarUserMenu';

const MAIN_MENU = [
  {
    label: 'Dashboard',
    url: '/admin/dashboard',
    icon: LayoutDashboardIcon,
  },
  {
    label: 'Blogs',
    url: '/admin/blogs',
    icon: TextIcon,
  },
  {
    label: 'Comments',
    url: '/admin/comments',
    icon: MessageSquareIcon,
  },
  {
    label: 'Users',
    url: '/admin/users',
    icon: UserIcon,
  },
];

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const location = useLocation();
  return (
    <Sidebar
      {...props}
      variant='inset'
      collapsible='icon'
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg'>
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarMenu>
            {MAIN_MENU.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.label}
                  isActive={location.pathname === item.url}
                >
                  <Link
                    to={item.url}
                    viewTransition
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarUserMenu />
      </SidebarFooter>
    </Sidebar>
  );
};
