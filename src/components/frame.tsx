/*
 * @Description: Frame component
 *
 * @Author: Jin
 * @Date: 2024-10-11 10:21:44
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */
import React from "react";
import { useRef, useImperativeHandle } from "react";
import { IFrameInputData, Frame as LeaferFrame } from "leafer-ui";
import useLeaferComponent from "../hooks/useLeaferComponent";
import { LeaferContext } from "../context/leaferContext";

interface IFrameProps extends Omit<IFrameInputData, "children"> {
  children?: React.ReactNode;
}

export interface FrameRef {
  leaferFrame: LeaferFrame | null;
}

function Frame(props: IFrameProps, ref: React.Ref<FrameRef>) {
  const { children, ...rest } = props;
  const frameRef = useRef<LeaferFrame>(new LeaferFrame({ ...rest }));

  useLeaferComponent(() => frameRef.current);

  useImperativeHandle(ref, () => ({
    leaferFrame: frameRef.current,
  }));

  return (
    <LeaferContext.Provider value={frameRef.current}>
      {children}
    </LeaferContext.Provider>
  );
}

export default React.forwardRef(Frame);
