import { useLoaderData } from 'react-router';
import { motion } from 'motion/react';
import { cn, getUsername } from '@/lib/utils';

import { BlogCard } from '@/components/BlogCard';
import { Page } from '@/components/Page';
import { Button } from '@/components/ui/button';

import type { Variants } from 'motion/react';
import type { Blog as BlogType, PaginatedResponse } from '@/types';

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
      ease: 'easeOut',
    },
  },
};

const Blogs = ({ className, ...props }: React.ComponentProps<'section'>) => {
  const loaderData = useLoaderData() as PaginatedResponse<BlogType, 'blogs'> | undefined;
  const blogs = loaderData?.blogs ?? [];
  const isEmpty = blogs.length === 0;

  return (
    <Page>
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
            All Blogs
          </motion.h2>

          {isEmpty ? (
            <div className='py-8 text-center text-muted-foreground'>
              <p className='text-lg font-medium'>No blogs found</p>
              <p className='mt-2'>There are no blogs to display. Try refreshing or check back later.</p>
            </div>
          ) : (
            <motion.ul
              className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
              initial='from'
              whileInView='to'
              viewport={{ once: true }}
              variants={listVariants}
            >
              {blogs.map(
                ({ slug, banner, title, content, author, publishedAt }) => (
                  <motion.li
                    key={slug}
                    variants={itemVariants}
                  >
                    <BlogCard
                      bannerUrl={banner?.url ?? ''}
                      bannerWidth={banner?.width ?? 640}
                      bannerHeight={banner?.height ?? 360}
                      title={title}
                      content={content}
                      slug={slug}
                      authorName={getUsername(author) ?? 'Unknown'}
                      publishedAt={publishedAt ?? new Date().toISOString()}
                    />
                  </motion.li>
                ),
              )}
            </motion.ul>
          )}

          <motion.div
            className='flex justify-center mt-8 md:mt-10'
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.5, ease: 'backInOut' },
            }}
          >
            <Button
              variant='default'
              size='lg'
            >
              See More
            </Button>
          </motion.div>
        </div>
      </section>
    </Page>
  );
};

export default Blogs;
