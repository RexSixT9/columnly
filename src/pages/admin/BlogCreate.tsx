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
      <h2 className='text-2xl font-semibold mb-4'>Create New Blog</h2>
      <BlogForm onSubmit={() => {}} />
    </div>
  );
};
