/*
 * @Description: Leafer View Hook
 *
 * @Author: Jin
 * @Date: 2024-11-08 14:01:09
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import type { App, Leafer } from 'leafer-ui';
import { useEffect } from 'react';

export const useLeaferView = <T extends App | Leafer>(
  leafer: T | null,
  props: Record<string, any>,
) => {
  useEffect(() => {
    if (!leafer) return;
    if (leafer.config.move) {
      leafer.config.move.disabled = props.disableMove;
    }
    if (leafer.config.wheel) {
      leafer.config.wheel.disabled = props.disableWheel;
    }
    if (leafer.config.zoom) {
      leafer.config.zoom.disabled = props.disableZoom;
    }
  }, [leafer, props]);
};
