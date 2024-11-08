/*
 * @Description: Frame component
 *
 * @Author: Jin
 * @Date: 2024-10-11 10:21:44
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { type IFrameInputData, Frame as LeaferFrame } from 'leafer-ui';
import React, { useImperativeHandle } from 'react';
import { LeaferContext } from '../context/leaferContext';
import useLeaferComponent from '../hooks/useLeaferComponent';
import useLeaferProps from '../hooks/useLeaferProps';

export interface IFrameProps extends Omit<IFrameInputData, 'children'> {
  children?: React.ReactNode;
}

export interface FrameRef {
  leaferFrame: LeaferFrame | null;
}

function Frame(props: IFrameProps, ref: React.Ref<FrameRef>) {
  const { children, ...rest } = props;

  const [leaferFrame, initialized] = useLeaferComponent(
    () => new LeaferFrame(rest),
  );

  useLeaferProps(leaferFrame, rest);

  useImperativeHandle(ref, () => ({
    leaferFrame: leaferFrame as LeaferFrame,
  }));

  return (
    <LeaferContext.Provider value={leaferFrame}>
      {initialized && children}
    </LeaferContext.Provider>
  );
}

export default React.forwardRef(Frame);
