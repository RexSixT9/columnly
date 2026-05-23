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
      ease: 'backInOut',
    },
  },
};

const Blogs = ({ className, ...props }: React.ComponentProps<'section'>) => {
  const loaderData = useLoaderData() as PaginatedResponse<BlogType, 'blogs'>;
  const { blogs } = loaderData;
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

          <motion.ul
            className='grid gap-4 lg:grid-cols-2 xl:grid-cols-3'
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
                    bannerUrl={banner.url}
                    bannerWidth={banner.width}
                    bannerHeight={banner.height}
                    title={title}
                    content={content}
                    slug={slug}
                    authorName={getUsername(author)}
                    publishedAt={publishedAt}
                  />
                </motion.li>
              ),
            )}
          </motion.ul>
          <motion.div
            className='flex justify-center mt-8 md:mt-10'
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.5, ease: 'backInOut' },
            }}
          >
            <Button
              asChild
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
