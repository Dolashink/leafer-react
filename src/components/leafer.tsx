/*
 * @Description: Leafer Component
 *
 * @Author: Jin
 * @Date: 2024-10-16 10:09:56
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { type ILeaferConfig, Leafer as LeaferUI, MoveEvent } from 'leafer-ui';
import React, { useImperativeHandle } from 'react';
import { LeaferContext } from '../context/leaferContext';
import useLeaferComponent from '../hooks/useLeaferComponent';
import useLeaferProps from '../hooks/useLeaferProps';
import { useLeaferView } from '../hooks/useLeaferView';

export interface LeaferRef {
  leafer: LeaferUI;
}

export interface ILeaferProps extends ILeaferConfig {
  children?: React.ReactNode;
  onMoveEnd?: (event: MoveEvent) => void;
}

function Leafer(props: ILeaferProps, ref: React.Ref<LeaferRef>) {
  const { onMoveEnd, children, ...rest } = props;

  const [leafer, initialized] = useLeaferComponent(() => {
    const leafer = new LeaferUI(rest);
    leafer.on(MoveEvent.END, onMoveEnd);
    return leafer;
  });

  useLeaferView(leafer, props);

  useLeaferProps(leafer, rest);

  useImperativeHandle(ref, () => ({
    leafer: leafer as LeaferUI,
  }));

  return (
    <LeaferContext.Provider value={leafer}>
      {initialized && children}
    </LeaferContext.Provider>
  );
}

export default React.forwardRef(Leafer);
