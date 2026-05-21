import { Link } from 'react-router';
import { Editor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { formatDistanceToNowStrict } from 'date-fns';
import { CalendarIcon, UserIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  const editor = new Editor({
    extensions: [StarterKit],
    content,
    editable: false,
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
      <CardHeader
        className={cn(
          'gap-2',
          size === 'sm' && 'content-center order-1 ps-4 py-3',
        )}
      ></CardHeader>
    </Card>
  );
};
