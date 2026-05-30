import { useLoaderData, useFetcher } from 'react-router';
import { useEffect, useState, Fragment, useMemo, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CommentCard } from '@/components/CommentCard';

import { Loader2Icon } from 'lucide-react';
import type { Comment, PaginatedResponse } from '@/types';

export const Comments = () => {
  const fetcher = useFetcher();
  const loaderData = useLoaderData() as PaginatedResponse<Comment, 'comments'>;
  const fetcherData = fetcher.data as PaginatedResponse<Comment, 'comments'>;

  const { offset, limit, total, comments } = useMemo(
    () => fetcherData || loaderData,
    [fetcherData, loaderData],
  );

  const [allComments, setAllComments] = useState<Comment[]>([]);

  const handleLoadMore = useCallback((offset: number) => {
    const searchParams = new URLSearchParams();
    searchParams.set('offset', offset.toString());
    fetcher.submit(searchParams, { method: 'get', action: '/admin/comments' });
  }, [fetcher]);

  useEffect(() => {
    if (!comments) return;

    // schedule update asynchronously to avoid synchronous setState in effect
    const id = setTimeout(() => {
      setAllComments((prevComments) => {
        // if we're on the first page (offset 0), replace the list
        if (offset === 0) return comments;

        // otherwise append new comments but avoid duplicates by _id
        const existingIds = new Set(prevComments.map((c) => c._id));
        const newComments = comments.filter((c) => !existingIds.has(c._id));
        return [...prevComments, ...newComments];
      });
    }, 0);

    return () => clearTimeout(id);
  }, [comments, offset]);

  const hasMoreComments = offset + limit < total;
  const isLoading =
    fetcher.state === 'loading' &&
    fetcher.formMethod === 'GET' &&
    fetcher.formAction === '/admin/comments';

  return (
    <div className='p-4 container space-y-4'>
      <h2 className='text-2xl font-semibold'>All Comments</h2>

      <div>
        {allComments.map(
          ({ _id, content, likesCount, user, blog, createdAt }, index, arr) => (
            <Fragment key={_id}>
              <CommentCard
                content={content}
                likesCount={likesCount}
                user={user}
                blog={blog}
                createdAt={createdAt}
              />
              {index < arr.length - 1 && <Separator className='my-1' />}
            </Fragment>
          ),
        )}
      </div>

      <div className='flex justify-center my-4'>
        {hasMoreComments ? (
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
            No more comments to load.
          </p>
        )}
      </div>
    </div>
  );
};
