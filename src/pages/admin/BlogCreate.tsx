import { useFetcher } from 'react-router';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { BlogForm } from '@/components/BlogForm';

export const BlogCreate = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';

  return (
    <div
      className={cn(
        'max-w-3xl w-full mx-auto p-4',
        isSubmitting && 'pointer-events-none opacity-70',
      )}
    >
      <BlogForm
        onSubmit={({ title, content, banner_image }, status) => {
          if (!banner_image)
            return toast.error('Please upload a banner image.');

          const formData = new FormData();
          formData.append('title', title);
          formData.append('content', content);
          formData.append('banner_image', banner_image);
          formData.append('status', status);

          const submitPromise = fetcher.submit(formData, {
            method: 'post',
            encType: 'multipart/form-data',
          });

          toast.promise(submitPromise, {
            loading: 'Creating blog post...',
            success: {
              message: 'Blog post created successfully!',
              description: 'Redirecting to blog list...',
            },
            error: {
              message: 'Failed to create blog post.',
              description: 'Please try again.',
            },
          });
        }}
      />
    </div>
  );
};
