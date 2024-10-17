/*
 * @Description: Leafer app component
 *
 * @Author: Jin
 * @Date: 2024-10-11 10:21:26
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */
import React, { useRef, useEffect, useImperativeHandle, useState } from 'react';
import { App, IAppConfig } from 'leafer-ui';
import { LeaferContext } from "../context/leaferContext";

export interface LeaferAppRef {
  leaferApp: App;
}

interface AppProps extends IAppConfig {
  children?: React.ReactNode;
  appId?: string;
  className?: string;
}

function LeaferApp(props: AppProps, ref: React.Ref<LeaferAppRef>) {
  const {
    children,
    appId = 'default',
    className,
    ...rest
  } = props;
  const leaferAppRef = useRef<App | null>(null);
  const container = useRef<HTMLDivElement>(null);

  const [isLeaferAppReady, setIsLeaferAppReady] = useState<boolean>(false);
  
  useEffect(() => {
    if (!container.current) return;
    const leaferApp = new App({ ...rest, view: container.current });

    leaferAppRef.current = leaferApp;

    setIsLeaferAppReady(true);

    return () => {
      if (leaferAppRef.current) {
        setIsLeaferAppReady(false);
      }
    };
  }, [appId, rest]);

  useImperativeHandle(ref, () => ({
    leaferApp: leaferAppRef.current as App,
  }));

  return (
    <div
      className={`leafer-app-container ${className || ''}`}
      style={{ width: '100%', height: '100%', flex: 1 }}
      ref={container}
    >
      <LeaferContext.Provider value={leaferAppRef.current}>
        {isLeaferAppReady && children}
      </LeaferContext.Provider>
    </div>
  );
}

export default React.forwardRef(LeaferApp);
