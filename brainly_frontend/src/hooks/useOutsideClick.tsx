import { useEffect, useRef } from "react";

const useOutsideClick = (callback: () => void, active: boolean) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const ignoreClick = useRef(true);

  useEffect(() => {
    if (!active) return;

    ignoreClick.current = true;

    // Defer disabling ignore to next tick
    const timer = setTimeout(() => {
      ignoreClick.current = false;
    }, 0);

    const handleClick = (event: MouseEvent) => {
      if (ignoreClick.current) return;

      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClick);
    };
  }, [callback, active]);

  return ref;
};

export default useOutsideClick;
