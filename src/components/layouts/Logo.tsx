import { Link } from 'react-router';
import { motion } from 'motion/react';

const MotionLink = motion.create(Link);

import { logoNavDarkSmall, logoNavLightSmall } from '@/assets';

const Logo = () => {
  return (
    <MotionLink
      to='/'
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      viewTransition
      className='text-primary text-lg font-semibold'
    >
      <img
        src={logoNavDarkSmall}
        alt='Logo'
        height={32}
        width={115}
        className='hidden dark:block'
      />
      <img
        src={logoNavLightSmall}
        alt='Logo'
        width={115}
        height={32}
        className='block dark:hidden'
      />
    </MotionLink>
  );
};

export default Logo;
