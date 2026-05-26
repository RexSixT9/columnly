import { useLocation, Link, useLoaderData } from 'react-router';
import { Fragment } from 'react';
import {
  Card,
  CardContent,
  CardAction,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TopAppBar from '@/components/TopAppBar';
import { Separator } from '@/components/ui/separator';

import { useUser } from '@/hooks/useUser';

import { TextIcon, UserRoundIcon, MessageSquareIcon } from 'lucide-react';

import type { DashboardData } from '@/routes/loaders/admin/dashboard';

export const Dashboard = () => {
  const loaderData = useLoaderData();
  const loggedInUser = useUser();

  console.log('Dashboard loader data:', loaderData);

  return (
    <div className='container p-4 space-y-4'>
      <h2 className='text-2xl font-semibold'>Dashboard</h2>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <Card className='gap-4 py-4'>
          <CardHeader className='px-4 flex items-center gap-2.5'>
            <div className='bg-muted text-muted-foreground max-w-max p-2 rounded-lg'>
              <TextIcon size={18} />
            </div>
            <CardTitle className='text-lg font-normal'>Blogs</CardTitle>
          </CardHeader>
          <CardContent className='px-4 text-4xl tracking-wider'>
            {loaderData.blogsCount}
          </CardContent>
        </Card>
        <Card className='gap-4 py-4'>
          <CardHeader className='px-4 flex items-center gap-2.5'>
            <div className='bg-muted text-muted-foreground max-w-max p-2 rounded-lg'>
              <UserRoundIcon size={18} />
            </div>
            <CardTitle className='text-lg font-normal'>Users</CardTitle>
          </CardHeader>
          <CardContent className='px-4 text-4xl tracking-wider'>
            {loaderData.usersCount}
          </CardContent>
        </Card>

        <Card className='gap-4 py-4'>
          <CardHeader className='px-4 flex items-center gap-2.5'>
            <div className='bg-muted text-muted-foreground max-w-max p-2 rounded-lg'>
              <MessageSquareIcon size={18} />
            </div>
            <CardTitle className='text-lg font-normal'>Comments</CardTitle>
          </CardHeader>
          <CardContent className='px-4 text-4xl tracking-wider'>
            {loaderData.commentsCount}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
