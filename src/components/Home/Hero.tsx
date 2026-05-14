import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import type { Variants } from 'motion/react';

const HERO = {
  headline: 'Discover Your Next Read with Columnly',
  description:
    'Explore a world of books, reviews, and recommendations. Find your next favorite read with Columnly.',
  cta: 'Get Started',
} as const;

const containerVariants: Variants = {
  to: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const childenVariants: Variants = {
  from: { opacity: 0, filter: 'blur(10px)' },
  to: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const Hero = ({
  className,
  ...props
}: React.ComponentProps<'section'>) => {
  return (
    <section
      className={cn('section', className)}
      {...props}
    >
      <motion.div>
        <motion.h1>{HERO.headline}</motion.h1>
      </motion.div>
    </section>
  );
};
