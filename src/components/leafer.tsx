/*
 * @Description: Leafer Component
 * 
 * @Author: Jin
 * @Date: 2024-10-16 10:09:56
 * 
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import React from "react";
import { useRef, useImperativeHandle } from "react";
import { ILeaferConfig, Leafer as LeaferUI } from "leafer-ui";
import useLeaferComponent from "../hooks/useLeaferComponent";
import { LeaferContext } from "../context/leaferContext";

export interface LeaferRef {
  leafer: LeaferUI;
}

interface ILeaferProps extends ILeaferConfig {
  children?: React.ReactNode;
}

function Leafer(props: ILeaferProps, ref: React.Ref<LeaferRef>) {
  const { children, ...rest } = props;

  const leafer = useRef<LeaferUI>(new LeaferUI({ ...rest }));

  useLeaferComponent(() => leafer.current);

  useImperativeHandle(ref, () => ({
    leafer: leafer.current,
  }));

  return (
    <LeaferContext.Provider value={leafer.current}>
      {children}
    </LeaferContext.Provider>
  );
};

export default React.forwardRef(Leafer);
