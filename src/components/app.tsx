/*
 * @Description: Leafer app component
 *
 * @Author: Jin
 * @Date: 2024-10-11 10:21:26
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import {
  EditorEvent,
  EditorMoveEvent,
  EditorScaleEvent,
} from '@leafer-in/editor';
import {
  App,
  DragEvent,
  type IAppConfig,
  type IEditorBase,
  type ILeafer,
  type MoveEvent as LeaferMoveEvent,
} from 'leafer-ui';
import React, { useEffect, useImperativeHandle, useRef } from 'react';
import { LeaferContext } from '../context/leaferContext';
import useLeaferComponent from '../hooks/useLeaferComponent';
import '@leafer-in/text-editor';
import '@leafer-in/view';
import { ScrollBar } from '@leafer-in/scroll';
import { Ruler } from 'leafer-x-ruler';
import type { MoveEvent } from '../types/editor';

export interface LeaferAppRef {
  leaferApp: App;
  editor: IEditorBase;
}

export interface AppProps extends IAppConfig {
  children?: React.ReactNode;
  appId?: string;
  className?: string;
  ruler?: boolean;
  onSelect?: (e: EditorEvent) => void;
  onMove?: (e: EditorMoveEvent) => void;
  onMoveEnd?: (e: MoveEvent) => void;
  onScale?: (e: EditorScaleEvent) => void;
}

function LeaferApp(props: AppProps, ref: React.Ref<LeaferAppRef>) {
  const {
    children,
    appId = 'default',
    className,
    ruler = true,
    onSelect,
    onMove,
    onScale,
    onMoveEnd,
    editor = {},
    ...rest
  } = props;
  const rulerRef = useRef<Ruler | null>(null);
  const scrollBarRef = useRef<ScrollBar | null>(null);

  const initApp = () => {
    const app = new App({ editor, view: appId, ...rest });
    if (app.sky) {
      rulerRef.current = new Ruler(app);
      scrollBarRef.current = new ScrollBar(app);
    }
    // 监听editor事件
    app.editor?.on(EditorEvent.SELECT, onSelect);
    app.editor?.on(EditorMoveEvent.MOVE, onMove);
    app.editor?.on(EditorScaleEvent.SCALE, onScale);
    // 监听编辑器编辑框的拖拽结束事件，实现编辑器的拖拽结束事件（参考源码实现）
    app.editor?.editBox?.rect?.on(DragEvent.END, (e: LeaferMoveEvent) => {
      // 不直接修改只读属性 target, 而是创建新对象
      const event = { ...e, target: app.editor.target };
      onMoveEnd?.(event as MoveEvent);
    });
    return app;
  };

  const [initialized, leaferApp] = useLeaferComponent(initApp);

  useEffect(() => {
    rulerRef.current?.changeEnabled(ruler);
  }, [ruler]);

  useEffect(() => {
    if (!leaferApp) return;
    requestIdleCallback(() => {
      leaferApp.tree.zoom({ x: 0, y: 0, width: 375, height: 667 });
    });
  }, [leaferApp]);

  useImperativeHandle(ref, () => ({
    leaferApp: leaferApp as App,
    editor: leaferApp?.editor as IEditorBase,
  }));

  return (
    <div
      className={`leafer-app-container ${className || ''}`}
      id={appId}
      style={{ width: '100%', height: '100%', flex: 1 }}
    >
      <LeaferContext.Provider value={leaferApp?.tree as ILeafer}>
        {initialized && children}
      </LeaferContext.Provider>
    </div>
  );
}

export default React.forwardRef(LeaferApp);
