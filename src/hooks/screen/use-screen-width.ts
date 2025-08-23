'use client';

import { useEffect, useState } from 'react';

const useScreenWidth = (mobileBreakpoint: number = 1024) => {
  const [width, setWidth] = useState<number>(1200);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = async () => {
      setTimeout(() => {
        setWidth(window.innerWidth);
        setIsLoaded(true);
      }, 50);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { width, isMobile: width < mobileBreakpoint, isLoaded };
};

export default useScreenWidth;
