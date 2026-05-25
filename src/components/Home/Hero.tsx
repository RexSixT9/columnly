import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import type { Variants } from 'motion/react';

const HERO = {
  headline: 'Discover, Share, and Connect on Columnly',
  text: 'Join a vibrant community of writers and readers. Explore insightful articles, share your thoughts, and connect with like-minded individuals.',
  cta: 'Get Started',
} as const;

const containerVariants: Variants = {
  to: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const childrenVariants: Variants = {
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
      <motion.div
        className='container'
        initial='from'
        whileInView='to'
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h1
          className='text-3xl font-semibold text-center text-balance md:text-4xl'
          variants={childrenVariants}
        >
          {HERO.headline}
        </motion.h1>
        <motion.p
          className='text-center text-balance text-muted-foreground  mt-5 mb-8 md:text-xl'
          variants={childrenVariants}
        >
          {HERO.text}
        </motion.p>
        <motion.div
          className='max-w-md mx-auto flex items-center justify-center gap-2'
          variants={childrenVariants}
        >
          <Input
            type='email'
            name='email'
            autoComplete='email'
            aria-label='email'
            placeholder='Enter your email'
            className='max-w-sm'
          />
          <Button>{HERO.cta}</Button>
        </motion.div>
      </motion.div>
    </section>
  );
};
