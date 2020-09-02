import { useEffect, useRef } from "react";

export const Loop = (callback, delay) => {
  const prevCallback = useRef();
  useEffect(() => {
    prevCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay) {
      const ID = setInterval(() => prevCallback.current(), delay);
      return () => clearInterval(ID);
    }
  }, [delay]);
};
