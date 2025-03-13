
import { useCallback } from 'react';

/**
 * Custom hook that provides animation variants for framer-motion
 * Used primarily in question card transitions
 */
export const useAnimationVariants = () => {
  const variants = {
    hidden: { 
      opacity: 0, 
      x: 50,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      x: -50,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  return { variants };
};
