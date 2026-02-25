import { useEffect, useState } from "react";

const useScrollPosition = (offset = 10) => {
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [isScrolled, setIsScrolled] = useState(window.scrollY > offset);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setIsScrolled(y > offset);    
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return { isScrolled, scrollY };
};

export default useScrollPosition;
