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
  const [paginateTo, setPaginateTo] = useState<paginateTo>();

  const isPaginating =
    fetcher.state === 'loading' &&
    fetcher.formMethod === 'GET' &&
    fetcher.formAction === '/admin/blogs';

  const showingFrom = offset + 1;
  const showingTo = total <= limit ? total : offset + limit;

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set('limit', currentLimit.toString());
    searchParams.set('offset', currentOffset.toString());
    fetcher.submit(searchParams.toString());
  }, [currentLimit, currentOffset]);

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor((offset + 1) / limit);

  return (
    <div className='p-4 container space-y-4'>
      <h2 className='text-2xl font-semibold'>All Blogs</h2>

      <BlogTable
        columns={columns}
        data={blogs}
      />

      <div className='flex items-center justify-between'>
        <div className='text-sm text-muted-foreground flex flex-1 font-medium'>
          Showing {showingFrom} - {showingTo} of {total} blogs
        </div>

        <div className='flex items-center gap-8 w-fit'>
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
                setCurrentLimit(LimitN);
                setPaginateTo(null);
                setCurrentOffset(0);

                const inLastPage = currentPage === totalPages;
                if (inLastPage && offset !== 0) {
                  setCurrentOffset(total - (total % LimitN || LimitN));
                }
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
        </div>
      </div>
    </div>
  );
};
