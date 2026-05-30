import { useLoaderData, useFetcher } from 'react-router';
import { useEffect, useState, useMemo, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import UserCard from '@/components/UserCard';
import { useUser } from '@/hooks/useUser';
import { Loader2Icon } from 'lucide-react';
import type { PaginatedResponse, User } from '@/types';

export const Users = () => {
  const fetcher = useFetcher();
  const loggedInUser = useUser()!;
  const loaderData = useLoaderData() as PaginatedResponse<User, 'users'>;
  const fetcherData = fetcher.data as PaginatedResponse<User, 'users'>;

  const { offset, limit, total, users } = useMemo(
    () => fetcherData || loaderData,
    [fetcherData, loaderData],
  );

  const [allUsers, setAllUsers] = useState<User[]>([]);

  const handleLoadMore = useCallback((offset: number) => {
    const searchParams = new URLSearchParams();
    searchParams.set('offset', offset.toString());
    fetcher.submit(searchParams, {
      method: 'get',
      action: '/admin/users',
    });
  }, []);

  useEffect(() => {
    if (!users) return;
    const id = setTimeout(() => {
      setAllUsers((prevUsers) => {
        if (offset === 0) return users;
        const existingIds = new Set(prevUsers.map((u) => u._id));
        const newUsers = users.filter((u) => !existingIds.has(u._id));
        return [...prevUsers, ...newUsers];
      });
    }, 0);
    return () => clearTimeout(id);
  }, [users, offset]);

  const hasMoreUsers = offset + limit < total;
  const isLoading =
    fetcher.state === 'loading' &&
    fetcher.formMethod === 'GET' &&
    fetcher.formAction === '/admin/users';

  return (
    <div className='p-4 container space-y-4'>
      <h2 className='text-2xl font-semibold'>All Users</h2>

      <div className='grid lg:grid-cols-2 xl:grid-cols-3 gap-3'>
        {allUsers.map(
          ({ _id, username, firstName, lastName, email, role, createdAt }) => (
            <UserCard
              key={_id}
              userId={_id}
              role={role}
              username={username}
              firstName={firstName}
              lastName={lastName}
              email={email}
              createdAt={createdAt}
              loggedInUser={loggedInUser}
              onUserDeleteSuccess={() => {
                setAllUsers((prev) => prev.filter((u) => u._id !== _id));
              }}
            />
          ),
        )}
      </div>

      <div className='flex justify-center my-4'>
        {hasMoreUsers ? (
          <Button
            variant='outline'
            onClick={handleLoadMore.bind(null, offset + limit)}
            disabled={isLoading}
          >
            {isLoading && <Loader2Icon className='animate-spin' />}
            Load More
          </Button>
        ) : (
          <p className='text-sm text-muted-foreground'>
            No more users to load.
          </p>
        )}
      </div>
    </div>
  );
};
