import { useLoaderData, useFetcher } from 'react-router';
import { toast } from 'sonner';
import { BlogForm } from '@/components/BlogForm';

import type { Blog } from '@/types';

export const BlogEdit = () => {
  const loaderData = useLoaderData() as { blog: Blog };
  const fetcher = useFetcher();

  const blog = loaderData.blog;

  return (
    <div className={'max-w-3xl w-full mx-auto p-4'}>
      <BlogForm
        defaultValues={{
          title: blog.title,
          content: blog.content,
          bannerUrl: blog.banner.url,
          status: blog.status,
        }}
        onSubmit={({ title, content, banner_image }, status) => {
          const formData = new FormData();

          if (banner_image) {
            formData.append('banner_image', banner_image);
          }
          if (title !== blog.title) formData.append('title', title);
          if (content !== blog.content) formData.append('content', content);
          if (status !== blog.status) formData.append('status', status);

          const submitPromise = fetcher.submit(formData, {
            method: 'put',
            encType: 'multipart/form-data',
          });

          toast.promise(submitPromise, {
            loading: 'Updating blog post...',
            success: {
              message: 'Blog post updated successfully!',
              description: 'Your changes have been saved.',
            },
            error: {
              message: 'Failed to update blog post.',
              description: 'Please try again.',
            },
          });
        }}
      />
    </div>
  );
};
