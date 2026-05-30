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
  return <div>BlogForm</div>;
};
