/*
 * @Description: useLeaferComponent hooks
 *
 * @Author: Jin
 * @Date: 2024-10-14 10:48:31
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import type { UI } from 'leafer-ui';
import { useEffect, useRef, useState } from 'react';
import { useLeaferContext } from './useLeaferContext';

/**
 * Custom hook for creating and managing Leafer components
 * @template T Component type extending UI
 * @param {() => T} createComponent Function to create the component
 * @returns {null} Returns nothing
 */
function useLeaferComponent<T extends UI>(createComponent: () => T) {
  const { current: mountedCallback } = useRef(createComponent);
  // Get parent component context
  const parentComponent = useLeaferContext<T>();
  const componentRef = useRef<T | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // Create component instance
    componentRef.current = mountedCallback();
    setInitialized(true);
    // If parent component doesn't exist, do nothing. If it exists, add component to parent
    parentComponent?.add(componentRef.current);
    // Cleanup function, remove when component unmounts
    return () => {
      // Destroy component to prevent memory leaks
      componentRef.current?.destroy();
    };
  }, [parentComponent, mountedCallback]); // Dependencies: parent component and component creation function

  return [initialized, componentRef.current] as [boolean, T | null];
}

export default useLeaferComponent;
