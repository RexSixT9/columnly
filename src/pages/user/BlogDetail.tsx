import { useCallback, useMemo } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Page } from '@/components/Page';
import Avatar from 'react-avatar';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  IconArrowLeft,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconLink,
  IconMessage,
  IconShare,
  IconThumbUp,
  IconBrandTwitter,
} from '@tabler/icons-react';

import type { Blog } from '@/types';
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import { getReadingTime, getUsername } from '@/lib/utils';

interface ShareDropdownProps extends DropdownMenuProps {
  blogTitle: string;
}

const BlogDetail = () => {
  const navigate = useNavigate();
  const { blog } = useLoaderData() as { blog: Blog };

  const editor = useEditor({
    extensions: [StarterKit],
    content: blog.content,
    editable: false,
    autofocus: false,
  });

  return (
    <Page>
      <article className='relative container max-w-180 pt-6 pb-0'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => navigate(-1)}
          className='sticky top-22 -ms-16'
        >
          <IconArrowLeft />
        </Button>
        <h1 className='text-4xl leading-tight font-semibold -mt-10'>
          {blog.title}
        </h1>

        <div className='flex items-center gap-3 my-8'>
          <div className='flex items-center gap-3'>
            <Avatar
              name={blog.author.email}
              size='32'
              round
            />
            <span className='text-sm font-medium'>
              {getUsername(blog.author)}
            </span>
          </div>

          <Separator
            orientation='vertical'
            className='data-[orientation=vertical]:h-1 data-[orientation=vertical]:w-1 rounded-full'
          />
          <div className='text-muted-foreground'>
            {getReadingTime(editor.getText() || '')} min read
          </div>
          <Separator
            orientation='vertical'
            className='data-[orientation=vertical]:h-1 data-[orientation=vertical]:w-1 rounded-full'
          />
          <div className='text-muted-foreground'>
            {new Date(blog.publishedAt).toLocaleDateString('en-US', {
              dateStyle: 'medium',
            })}
          </div>
        </div>

        <div className='flex items-center gap-2 my-2'>
          <Button
            variant='outline'
            size='sm'
          >
            <IconThumbUp className='me-1' />
            Like
          </Button>

          <Button
            variant='outline'
            size='sm'
          >
            <IconMessage className='me-1' />
            Comment
          </Button>
        </div>
      </article>
    </Page>
  );
};

export default BlogDetail;