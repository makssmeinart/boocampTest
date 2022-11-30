import { DependencyList, EffectCallback, useEffect, useRef } from "react";

const useLegacyUseEffect = (
  cb: EffectCallback,
  deps?: DependencyList
): void => {
  const isCalledRef = useRef(false);

  useEffect(() => {
    if (isCalledRef.current) return;
    isCalledRef.current = true;
    cb();
  }, [cb, deps]);
};

export default useLegacyUseEffect;
