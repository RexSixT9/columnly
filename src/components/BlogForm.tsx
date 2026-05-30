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
import { Tiptap } from './Tiptap';

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
    <div className='space-y-5 relative'>
      <div className='relative min-h-9 isolate'>
        {!hasBanner && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='outline'
                size='sm'
                className='absolute top-0.5 left-0.5 overflow-hidden'
                asChild
              >
                <Label>
                  <GalleryThumbnailsIcon className='me-2' />
                  Add Banner Image
                  <Input
                    type='file'
                    name='banner_image'
                    className='sr-only'
                    accept='image/jpg, image/jpeg, image/png, image/webp'
                    onChange={(e) => {
                      if (!e.target.files || e.target.files.length === 0)
                        return;

                      setData((prev) => ({
                        ...prev,
                        banner_image: e.target.files?.[0],
                      }));
                      setBannerPreview(
                        URL.createObjectURL(e.target.files?.[0]),
                      );
                    }}
                  />
                </Label>
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>
                Max file size: 2 MB. Supported formats: JPG, JPEG, PNG, WEBP
              </p>
            </TooltipContent>
          </Tooltip>
        )}

        <AnimatePresence>
          {hasBanner && (
            <motion.figure
              className='relative rounded-xl overflow-hidden border'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 240 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: 'spring', visualDuration: 0.25, bounce: 0.2 }}
            >
              <img
                src={bannerPreview}
                alt='Banner Preview'
                className='w-full h-full object-cover'
              />

              <Button
                variant='destructive'
                size='icon'
                className='absolute top-2 right-2'
                onClick={() => {
                  setData((prev) => ({
                    ...prev,
                    banner_image: undefined,
                  }));
                  setBannerPreview(undefined);
                }}
              >
                <XIcon className='w-4 h-4' />
              </Button>
            </motion.figure>
          )}
        </AnimatePresence>
      </div>

      <Textarea
        name='title'
        maxLength={180}
        className='text-4xl! font-semibold tracking-tight resize-none border-none ring-0! bg-transparent! px-0 shadow-none'
        placeholder='Blog Title'
        value={data.title}
        onChange={(e) =>
          setData((prev) => ({ ...prev, title: e.target.value }))
        }
      />

      <div className='relative border inset-ring-border rounded-2xl'>
        <Tiptap
          onUpdate={({ editor }) => {
            setData((prev) => ({ ...prev, content: editor.getHTML() }));
          }}
          content={data.content}
        />
      </div>
    </div>
  );
};
