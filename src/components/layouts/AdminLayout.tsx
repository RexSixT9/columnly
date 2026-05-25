import { Outlet } from 'react-router';

import { SidebarProvider, SidebarInset } from '../ui/sidebar';
import { AppSidebar } from '../AppSidebar';
import TopAppBar from '../TopAppBar';

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className='relative max-h-[calc(100dvh-16px)] overflow-auto '>
        <TopAppBar />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
