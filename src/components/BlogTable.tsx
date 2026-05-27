/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Link, useFetcher } from 'react-router';
import { motion } from 'motion/react';
import { Editor } from '@tiptap/react';
import { useMemo } from 'react';
import Starterkit from '@tiptap/starter-kit';
import { formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
import { cn, getUsername } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Avatar from 'react-avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const MotionTableBody = motion.create(TableBody);
const MotionTableRow = motion.create(TableRow);

import {
  MoreHorizontalIcon,
  Loader2Icon,
  PencilIcon,
  Send,
  Trash2Icon,
} from 'lucide-react';

import type { Blog, User } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import type { Variants } from 'motion/react';

interface BlogTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const tableBodyVariants: Variants = {
  to: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const tableRowVariants: Variants = {
  from: { opacity: 0 },
  to: { opacity: 1, transition: { duration: 0.5 } },
};

const BlogActionDropdown = ({ blog }: { blog: Blog }) => {
  const fetcher = useFetcher();
  const isPublished = useMemo(() => blog.status === 'published', [blog.status]);

  const isChanging = fetcher.state !== 'idle';
  const isUpdating = isChanging && fetcher.formMethod === 'PUT';
  const isDeleting = isChanging && fetcher.formMethod === 'DELETE';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='data-[state=open]:bg-muted text-muted-foreground flex size-8'
        >
          <span className='sr-only'>Open actions</span>
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        className='min-32'
      >
        <DropdownMenuItem asChild>
          <Link
            to={`/admin/blogs/${blog.slug}/edit`}
            viewTransition
            className='flex items-center gap-2'
          >
            <PencilIcon className='w-4 h-4' />
            Edit
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              disabled={isUpdating}
            >
              {isPublished ? (
                <Send className='w-4 h-4' />
              ) : (
                <Send className='w-4 h-4' />
              )}
              {isPublished ? 'Unpublish' : 'Publish'}
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {isPublished ? 'Unpublish Blog' : 'Publish Blog'}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {isPublished
                  ? 'Are you sure you want to unpublish this blog?'
                  : 'Are you sure you want to publish this blog?'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  const formData = new FormData();
                  formData.append(
                    'status',
                    isPublished ? 'draft' : 'published',
                  );

                  fetcher.submit(formData, {
                    method: 'PUT',
                    action: `/admin/blogs/${blog.slug}/edit`,
                    encType: 'multipart/form-data',
                  });
                }}
              >
                <Send className='w-4 h-4' />
                {isUpdating && <Loader2Icon className='animate-spin' />}
                {isPublished ? 'Unpublish' : 'Publish'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <DropdownMenuSeparator />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              variant='destructive'
              onSelect={(e) => e.preventDefault()}
              disabled={isDeleting}
            >
              <Trash2Icon className='w-4 h-4' />
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Blog</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this blog? This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  const data = { blogId: blog._id };
                  fetcher.submit(data, {
                    action: '/admin/blogs',
                    method: 'DELETE',
                    encType: 'application/json',
                  });
                }}
              >
                <Trash2Icon className='w-4 h-4' />
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Blog>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      const blog = row.original;
      const editor = new Editor({
        extensions: [Starterkit],
        content: row.original.content,
        editable: false,
        autofocus: false,
      });
      return (
        <Link
          to={`/blogs/${blog.slug}`}
          viewTransition
          className='flex items-center gap-4 group'
        >
          <figure className='shrink-0 w-30 h-17 rounded-md overflow-hidden'>
            <img
              className='w-full h-full object-cover'
              alt={blog.title}
              width={blog.banner.width}
              height={blog.banner.height}
              src={blog.banner.url}
            />
          </figure>

          <div>
            <div className='font-semibold mb-1 truncate max-w-[50ch] group-hover:underline'>
              {blog.title}
            </div>
            <p className='text-wrap line-clamp-2 max-w-[50ch] text-muted-foreground'>
              {editor.getText()}
            </p>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: 'author',
    header: 'Author',
    cell: ({ row }) => {
      const author = row.getValue('author') as User;
      return (
        <div className='flex items-center gap-2'>
          <Avatar
            name={author.email}
            size='24'
            className='rounded-md'
          />
          <div>{getUsername(author)}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as 'draft' | 'published';
      return (
        <Badge
          variant='outline'
          className={cn(
            'gap-1.5 capitalize',
            status === 'published'
              ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-100/20 dark:bg-emerald-800/20'
              : 'border-amber-300 dark:border-amber-800 bg-amber-100/20 dark:bg-amber-800/20',
          )}
        >
          <div
            className={cn(
              'w-1.5 h-1.5 rounded-full',
              status === 'published'
                ? 'bg-emerald-500 dark:bg-emerald-600'
                : 'bg-amber-500 dark:bg-amber-600',
            )}
          ></div>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => {
      const updatedAt = row.getValue('updatedAt') as string;
      const date = formatDistanceToNowStrict(updatedAt, { addSuffix: true });
      return (
        <Tooltip delayDuration={250}>
          <TooltipTrigger>{date}</TooltipTrigger>

          <TooltipContent>
            {new Date(updatedAt).toLocaleString('en-US', {
              dateStyle: 'long',
              timeStyle: 'short',
            })}
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: true,
    cell: ({ row }) => <BlogActionDropdown blog={row.original} />,
  },
];

const BlogTable = <TData, TValue>({
  columns,
  data,
}: BlogTableProps<TData, TValue>) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow
            key={headerGroup.id}
            className='border-none'
          >
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                colSpan={header.colSpan}
                className='bg-muted px-4 first:rounded-l-lg last:rounded-r-lg'
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <MotionTableBody
        variants={tableBodyVariants}
        initial='from'
        animate='to'
      >
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <MotionTableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              variants={tableRowVariants}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className='px-4 py-3 min-h-16 max-w-max'
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </MotionTableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className='text-center h-24'
            >
              No data available
            </TableCell>
          </TableRow>
        )}
      </MotionTableBody>
    </Table>
  );
}

export default BlogTable;
