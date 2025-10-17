// hooks/useIsMobile.js
import { useEffect, useState } from "react";

export default function useIsMobile(md = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window === "undefined" ? false : window.innerWidth < md
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < md);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [md]);

  return isMobile;
}
