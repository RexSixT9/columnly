import { useLoaderData, useFetcher } from 'react-router';
import { useEffect, useState } from 'react';

import BlogTable, { columns } from '@/components/BlogTable';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Loader2Icon,
} from 'lucide-react';

import type { Blog, PaginatedResponse } from '@/types';
import { Label } from '@/components/ui/label';
type paginateTo = 'first' | 'prev' | 'next' | 'last' | null;

const LIMIT = [5, 10, 20, 50, 100];

export const Blogs = () => {
  const fetcher = useFetcher();
  const loaderData = useLoaderData() as PaginatedResponse<Blog, 'blogs'>;
  const fetcherData = fetcher.data as PaginatedResponse<Blog, 'blogs'>;

  const { offset, limit, total, blogs } = fetcherData || loaderData;

  const [currentLimit, setCurrentLimit] = useState(limit);
  const [currentOffset, setCurrentOffset] = useState(offset);
  const [paginateTo, setPaginateTo] = useState<paginateTo>(null);

  const isPaginating =
    fetcher.state === 'loading' &&
    fetcher.formMethod === 'GET' &&
    fetcher.formAction === '/admin/blogs';

  const showingFrom = total === 0 ? 0 : currentOffset + 1;
  const showingTo =
    total === 0 ? 0 : Math.min(total, currentOffset + currentLimit);

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set('limit', currentLimit.toString());
    searchParams.set('offset', currentOffset.toString());
    fetcher.submit(searchParams.toString());
  }, [currentLimit, currentOffset]);

  const totalPages = total === 0 ? 0 : Math.ceil(total / currentLimit);
  const currentPage =
    total === 0 ? 0 : Math.floor(currentOffset / currentLimit) + 1;

  return (
    <div className='p-4 container space-y-4'>
      <h2 className='text-2xl font-semibold'>All Blogs</h2>

      <div className='overflow-x-auto'>
        <BlogTable columns={columns} data={blogs} />
      </div>

      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
        <div className='text-sm text-muted-foreground flex-1 font-medium'>
          Showing {showingFrom} - {showingTo} of {total} blogs
        </div>

        <div className='flex flex-wrap items-center gap-3 sm:gap-8 justify-end w-full sm:w-auto'>
          <div className='flex items-center gap-2'>
            <Label
              htmlFor='limit'
              className='text-sm font-medium'
            >
              Blogs per page:
            </Label>
            <Select
              value={currentLimit.toString()}
              onValueChange={(value) => {
                const LimitN = Number(value);
                setPaginateTo(null);
                const onLastPage =
                  total > 0 && currentOffset + currentLimit >= total;
                if (onLastPage) {
                  const newOffset = Math.max(
                    0,
                    total - (total % LimitN || LimitN),
                  );
                  setCurrentOffset(newOffset);
                } else {
                  setCurrentOffset(0);
                }
                setCurrentLimit(LimitN);
              }}
            >
              <SelectTrigger
                className='w-20'
                id='limit'
                size='sm'
              >
                <SelectValue placeholder='Limit' />
              </SelectTrigger>
              <SelectContent side='top'>
                {LIMIT.map((l) => (
                  <SelectItem
                    key={l}
                    value={l.toString()}
                  >
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='hidden sm:flex items-center justify-center gap-2 text-sm font-medium'>
            Page {currentPage} of {totalPages}
          </div>

          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              className='size-8 h-8 w-8 p-0 flex items-center justify-center'
              disabled={currentPage <= 1}
              aria-label='First Page'
              onClick={() => {
                setCurrentOffset(0);
                setPaginateTo('first');
              }}
            >
              {isPaginating && paginateTo === 'first' ? (
                <Loader2Icon className='animate-spin' />
              ) : (
                <ChevronsLeftIcon />
              )}
            </Button>

            <Button
              variant='outline'
              className='size-8 h-8 w-8 p-0 flex items-center justify-center'
              disabled={currentPage <= 1}
              aria-label='Previous Page'
              onClick={() => {
                setCurrentOffset((prev) => Math.max(0, prev - currentLimit));
                setPaginateTo('prev');
              }}
            >
              {isPaginating && paginateTo === 'prev' ? (
                <Loader2Icon className='animate-spin' />
              ) : (
                <ChevronLeftIcon />
              )}
            </Button>

            <Button
              variant='outline'
              className='size-8 h-8 w-8 p-0 flex items-center justify-center'
              disabled={currentPage >= totalPages}
              aria-label='Next Page'
              onClick={() => {
                setCurrentOffset((prev) => prev + currentLimit);
                setPaginateTo('next');
              }}
            >
              {isPaginating && paginateTo === 'next' ? (
                <Loader2Icon className='animate-spin' />
              ) : (
                <ChevronRightIcon />
              )}
            </Button>

            <Button
              variant='outline'
              className='size-8 h-8 w-8 p-0 flex items-center justify-center'
              disabled={currentPage >= totalPages}
              aria-label='Last Page'
              onClick={() => {
                setCurrentOffset(
                  Math.max(0, total - (total % currentLimit || currentLimit)),
                );
                setPaginateTo('last');
              }}
            >
              {isPaginating && paginateTo === 'last' ? (
                <Loader2Icon className='animate-spin' />
              ) : (
                <ChevronsRightIcon />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
