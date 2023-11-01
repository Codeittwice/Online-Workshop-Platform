import { useRef, useEffect, useMemo } from "react";
import debounce from "lodash/debounce";

const useDebounce = (callback: void, initial: any) => {
  const ref = useRef<typeof initial>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, 1000);
  }, []);

  return debouncedCallback;
};
export default useDebounce;
