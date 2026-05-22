import { Link } from 'react-router';
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import { formatDistanceToNowStrict } from 'date-fns';

import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface BlogCardProps extends React.ComponentProps<'div'> {
  bannerUrl: string;
  bannerWidth: number;
  bannerHeight: number;
  title: string;
  content: string;
  slug: string;
  authorName: string;
  publishedAt: string;
  size?: 'default' | 'sm';
}

export const BlogCard: React.FC<BlogCardProps> = ({
  bannerUrl,
  bannerWidth,
  bannerHeight,
  title,
  content,
  slug,
  authorName,
  publishedAt,
  size = 'default',
  className,
  ...props
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
    autofocus: false,
  });

  return (
    
    <Card
      className={cn(
        'group cursor-pointer relative pt-2 h-full @container',
        size === 'default' && 'flex flex-col-reverse justify-end',
        size === 'sm' && 'py-2 grid grid-cols-[1fr_1.15fr] gap-0 items-center',
        className,
      )}
      {...props}
    >
      <Link
        to={`/blog/${slug}`}
        className='absolute inset-0 z-10'
        aria-label={title}
        viewTransition
      />
      <CardHeader
        className={cn(
          'gap-2',
          size === 'sm' && 'content-center order-1 ps-4 py-3',
        )}
      >
        <div className='flex items-center gap-2 text-sm text-muted-foreground font-medium'>
          <p className='@max-3xs:hidden'>{authorName}</p>
          <div className='w-1 h-1 bg-muted-foreground/50 rounded-full @max-3xs:hidden'>
            {' '}
          </div>
          <Tooltip delayDuration={250}>
            <TooltipTrigger asChild>
              {formatDistanceToNowStrict(new Date(publishedAt), {
                addSuffix: true,
              })}
            </TooltipTrigger>
            <TooltipContent>
              {new Date(publishedAt).toLocaleString('en-US', {
                dateStyle: 'long',
                timeStyle: 'short',
              })}
            </TooltipContent>
          </Tooltip>
        </div>

        <CardTitle
          className={cn(
            'relative z-20 underline-offset-4 hover:underline leading-tight line-clamp-2',
            size === 'default' && 'text-xl @md:text-2xl',
          )}
        >
          {title}
        </CardTitle>

        <CardDescription
          className={cn(
            'line-clamp-2 text-balanced',
            size === 'sm' && '@max-2xs:hidden',
          )}
        >
          {editor.getText()}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <AspectRatio
          ratio={21 / 9}
          className='rounded-lg overflow-hidden'
        >
          <img
            src={bannerUrl}
            alt={title}
            width={bannerWidth}
            height={bannerHeight}
            className='object-cover w-full h-full'
          />
        </AspectRatio>
      </CardContent>
    </Card>
  );
};
