"use client";
import { useEffect, useState } from "react";

const useScreenWidth = () => {
  const [width, setWidth] = useState<number>(1200);

  useEffect(() => {
    const handleResize = async () => {
      setTimeout(() => {
        setWidth(window.innerWidth);
      }, 50);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width, isMobile: width < 1024 };
};

export default useScreenWidth;
