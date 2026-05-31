import { useCallback, useMemo } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import { toast } from 'sonner';
import Avatar from 'react-avatar';

import { Button } from '@/components/ui/button';
import { Page } from '@/components/Page';
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

export const ShareDropdown = ({
  blogTitle,
  children,
  ...props
}: ShareDropdownProps) => {
  const blogUrl = window.location.href;
  const shareText = `Check out this blog post: "${blogTitle}" - ${blogUrl}`;

  const SHARE_LINKS = useMemo(() => {
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(blogUrl)}&title=${encodeURIComponent(blogTitle)}`,
    };
  }, [blogUrl, blogTitle, shareText]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(blogUrl);
      toast.success('Blog URL copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy URL');
      console.error('Failed to copy URL:', err);
    }
  }, [blogUrl]);

  const shareOnSocial = useCallback((platformUrl: string) => {
    window.open(platformUrl, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-40'>
        <DropdownMenuItem onSelect={() => shareOnSocial(SHARE_LINKS.facebook)}>
          <IconBrandFacebook className='me-2' />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => shareOnSocial(SHARE_LINKS.twitter)}>
          <IconBrandTwitter className='me-2' />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => shareOnSocial(SHARE_LINKS.linkedin)}>
          <IconBrandLinkedin className='me-2' />
          LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleCopy}>
          <IconLink className='me-2' />
          Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const BlogDetail = () => {
  const navigate = useNavigate();
  const { blog } = useLoaderData() as { blog: Blog };

  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    content: blog?.content,
    editable: false,
    autofocus: false,
  });

  const readingTime = useMemo(() => {
    return getReadingTime(editor?.getText() ?? '');
  }, [editor]);

  return (
    <Page>
      <article className='relative container max-w-180 pt-6 pb-12 px-4 sm:px-6 lg:px-8 mx-auto'>
        <Button
          variant='outline'
          size='icon'
          onClick={() => navigate(-1)}
          className='sticky top-22 -ms-16'
        >
          <IconArrowLeft />
        </Button>
        <h1 className='text-3xl md:text-4xl leading-tight font-semibold -mt-10'>
          {blog.title}
        </h1>

        <div className='flex flex-wrap items-center gap-3 my-8'>
          <div className='flex items-center gap-3'>
            <Avatar
              name={blog.author.email}
              size='32'
              round
            />
            <span className='text-sm font-medium truncate'>
              {getUsername(blog.author)}
            </span>
          </div>

          <Separator
            orientation='vertical'
            className='hidden sm:block data-[orientation=vertical]:h-1 data-[orientation=vertical]:w-1 rounded-full'
          />

          <div className='text-muted-foreground text-sm'>{readingTime} min</div>

          <Separator
            orientation='vertical'
            className='hidden sm:block data-[orientation=vertical]:h-1 data-[orientation=vertical]:w-1 rounded-full'
          />

          <div className='text-muted-foreground text-sm'>
            {new Date(blog.publishedAt).toLocaleDateString('en-US', {
              dateStyle: 'medium',
            })}
          </div>
        </div>

        <div className='flex flex-wrap items-center gap-2 my-2'>
          <Button variant='ghost'>
            <IconThumbUp />
            {blog.likesCount || 0}
          </Button>

          <Button variant='ghost'>
            <IconMessage />
            {blog.commentsCount || 0}
          </Button>

          <ShareDropdown blogTitle={blog.title}>
            <Button
              variant='ghost'
              className='sm:ms-auto ms-0'
            >
              <IconShare />
              Share
            </Button>
          </ShareDropdown>
        </div>
        <Separator className='opacity-40' />

        <div className='my-8'>
          <AspectRatio
            ratio={21 / 9}
            className='overflow-hidden rounded-xl bg-border w-full'
          >
            {blog?.banner?.url ? (
              <img
                src={blog.banner.url}
                width={blog.banner.width ?? 1280}
                height={blog.banner.height ?? 540}
                alt={`Banner image for ${blog.title}`}
                className='object-cover w-full h-full'
                loading='lazy'
              />
            ) : (
              <div className='flex items-center justify-center w-full h-full bg-muted-foreground/10 text-muted-foreground'>
                <span className='text-sm'>No image available</span>
              </div>
            )}
          </AspectRatio>
        </div>
        <div className='max-w-full wrap-break-word my-6'>
          <EditorContent editor={editor} />
        </div>
      </article>
    </Page>
  );
};
