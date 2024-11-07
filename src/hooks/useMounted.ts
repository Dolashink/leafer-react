/*
 * @Description: componentDidMount
 *
 * @Author: Jin
 * @Date: 2024-10-11 14:34:23
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { useEffect, useRef } from 'react';

/**
 * Hook for executing code when the component mounts, equivalent to `componentDidMount`
 */
function useMounted<T = void>(callback: () => T) {
  const { current: mountedCallback } = useRef(callback);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    mountedCallback();
  }, [mountedCallback]);
}

export default useMounted;
