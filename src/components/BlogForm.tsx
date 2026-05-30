import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

import { GalleryThumbnailsIcon, XIcon } from 'lucide-react';

type BlogFormData = {
  title: string;
  content: string;
  banner_image?: Blob;
};
type BlogStatus = 'draft' | 'published';
type FormDefaultValues = {
  title: string;
  content: string;
  bannerUrl: string;
  status: BlogStatus;
};

type BlogFormProps = {
  defaultValues: FormDefaultValues;
  onSubmit: (formData: BlogFormData, status: BlogStatus) => void;
};

export const BlogForm: React.FC<BlogFormProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const [data, setData] = useState<BlogFormData>({
    title: defaultValues?.title || '',
    content: defaultValues?.content || '',
  });

  const [bannerPreview, setBannerPreview] = useState<string | undefined>(
    defaultValues?.bannerUrl,
  );

  const status = defaultValues?.status || 'draft';
  const hasBanner = useMemo(() => Boolean(bannerPreview), [bannerPreview]);

  return (
    <div>
      <div>
        {!hasBanner && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='outline'
                size='sm'
                className='w-full'
              >
                <GalleryThumbnailsIcon className='me-2' />
                Add Banner Image
              </Button>
            </TooltipTrigger>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
