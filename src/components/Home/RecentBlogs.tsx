import { useLoaderData } from 'react-router';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';
import type { Variants } from 'motion/react';
import type { HomeLoaderResponse } from '@/routes/loaders/user/home';
import { BlogCard } from '@/components/BlogCard';

const listVariants: Variants = {
  to: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const itemVariants: Variants = {
  from: { opacity: 0 },
  to: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'backInOut',
    },
  },
};

const RecentBlogs = ({
  className,
  ...props
}: React.ComponentProps<'section'>) => {
  const { recentBlogs } = useLoaderData<HomeLoaderResponse>();
  const blogs = recentBlogs?.blogs ?? [];
  const isEmpty = blogs.length === 0;

  return (
    <section
      className={cn('section', className)}
      {...props}
    >
      <div className='container'>
        <motion.h2
          className='section-title'
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.5, ease: 'easeOut' },
          }}
        >
          Recent Blogs
        </motion.h2>

        {isEmpty ? (
          <div className='py-8 text-center text-muted-foreground'>
            <p className='text-lg font-medium'>No recent blogs</p>
            <p className='mt-2'>No recently published blogs found. Try checking the All Blogs section.</p>
          </div>
        ) : (
          <motion.ul
            className='grid gap-4 lg:grid-cols-2 lg:grid-rows-3'
            initial='from'
            whileInView='to'
            viewport={{ once: true }}
            variants={listVariants}
          >
            {blogs.map(
              ({ slug, banner, title, content, author, publishedAt }, index) => (
                <motion.li
                  key={slug}
                  className={cn(index === 0 && 'lg:row-span-3')}
                  variants={itemVariants}
                >
                  <BlogCard
                    bannerUrl={banner?.url ?? ''}
                    bannerWidth={banner?.width ?? 640}
                    bannerHeight={banner?.height ?? 360}
                    title={title}
                    content={content}
                    slug={slug}
                    authorName={author?.username ?? 'Unknown'}
                    publishedAt={publishedAt ?? new Date().toISOString()}
                    size={index > 0 ? 'sm' : 'default'}
                  />
                </motion.li>
              ),
            )}
          </motion.ul>
        )}
      </div>
    </section>
  );
};

export default RecentBlogs;
