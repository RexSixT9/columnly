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
import BlogTable, { columns } from '@/components/BlogTable';
import { CommentCard } from '@/components/CommentCard';

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

      <Card className='gap-4 py-4'>
        <CardHeader className='px-4 flex items-center gap-2.5'>
          <div className='bg-muted text-muted-foreground max-w-max p-2 rounded-lg'>
            <TextIcon size={18} />
          </div>
          <CardTitle className='text-lg font-normal'>Recent Blogs</CardTitle>
          <CardAction className='ms-auto'>
            <Button
              asChild
              size='sm'
              variant='link'
            >
              <Link to='/admin/blogs'>View All</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className='px-4 '>
          <BlogTable
            data={loaderData.blogs}
            columns={columns}
          />
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:grid-cols-[2fr_1fr]'>
        <Card className='gap-4 py-4'>
          <CardHeader className='px-4 flex items-center gap-2.5'>
            <div className='bg-muted text-muted-foreground max-w-max p-2 rounded-lg'>
              <MessageSquareIcon size={18} />
            </div>
            <CardTitle className='text-lg font-normal'>
              Recent Comments
            </CardTitle>
            <CardAction className='ms-auto'>
              <Button
                asChild
                size='sm'
                variant='link'
              >
                <Link to='/admin/comments'>View All</Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className='px-4 '>
            {loaderData.comments.map(
              (
                { _id, content, likesCount, user, blog, createdAt },
                index,
                arr,
              ) => (
                <Fragment key={_id}>
                  <CommentCard
                    content={content}
                    likesCount={likesCount}
                    user={user}
                    blog={blog}
                    createdAt={createdAt}
                  />
                  {index < arr.length - 1 && <Separator className='my-2' />}
                </Fragment>
              ),
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
