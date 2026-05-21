import { useLoaderData } from 'react-router';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';
import type { Variants } from 'motion/react';

const containerVariants: Variants = {
  to: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const childenVariants: Variants = {
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
  return (
    <motion.section
      className={cn('section', className)}
      initial='from'
      whileInView='to'
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.h2 variants={childenVariants}>Recent Blogs</motion.h2>
    </motion.section>
  );
};

export default RecentBlogs;
