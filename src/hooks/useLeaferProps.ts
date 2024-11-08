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

function useLeaferProps<T extends UI>(
  leaferInstance: T | null,
  props: Record<string, any>,
) {
  useEffect(() => {
    if (!leaferInstance) return;
    for (const key in props) {
      leaferInstance.setAttr(key, props[key]);
    }
  }, [props, leaferInstance]);
}

export default useLeaferProps;
