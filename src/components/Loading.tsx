import React from 'react';
import { useNavigation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';

import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

const fadeInOut = {
  initial: { opacity: 0, translateY: -10 },
  animate: { opacity: 1, translateY: 0 },
  exit: { opacity: 0, translateY: -10 },
};

export const Loading = ({ className }: React.ComponentProps<'div'>) => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          {...fadeInOut}
          className={cn(
            'fixed left-1/2 -translate-x-1/2 top-21 p-2 bg-muted rounded-full shadow-lg',
            className,
          )}
        >
          <Loader
            className='animate-spin'
            size={32}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
