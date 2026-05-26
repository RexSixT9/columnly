import { useState, useEffect } from 'react';

import { Progress } from '@/components/ui/progress';

const PROGRESS_MAX = 100;

export const TopBarProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((value) => value + (PROGRESS_MAX - value) / 10);
    }, 100);
    return () => clearInterval(interval);
  });

  return (
    <Progress
      value={progress}
      max={PROGRESS_MAX}
      className='absolute bottom-0 left-1.5 right-1.5 w-auto h-1'
    />
  );
};
