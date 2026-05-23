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

interface ShareDropdownProps extends DropdownMenuProps {
  blogTitle: string;
}

export const BlogDetail = () => {
  const loaderData = useLoaderData();
  const { title, content } = loaderData;

  const editor = useEditor({
    extensions: [StarterKit],
    content,
  });

  return (
    <Page>
      <section className='section'>
        <div className='container'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => window.history.back()}
          >
            <IconArrowLeft />
          </Button>
          <h1 className='text-4xl font-bold mt-4'>{title}</h1>
          <div className='mt-6'>
            <EditorContent editor={editor} />
          </div>
        </div>
      </section>
    </Page>
  );
};
