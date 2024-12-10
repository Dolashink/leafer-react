/*
 * @Description: Set props for Leafer component
 *
 * @Author: Jin
 * @Date: 2024-11-08 10:53:35
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import type { UI } from 'leafer-ui';
import { useEffect } from 'react';

function useLeaferCmpProps<T extends UI>(
  leaferInstance: T | null,
  props: Record<string, any>,
  ignoreKeys: string[] = [],
) {
  useEffect(() => {
    if (!leaferInstance) return;
    for (const key in props) {
      if (ignoreKeys.includes(key)) continue;
      if (props[key] !== leaferInstance.getAttr(key)) {
        leaferInstance.setAttr(key, props[key]);
      }
    }
  }, [props, leaferInstance, ignoreKeys]);
}

export default useLeaferCmpProps;
