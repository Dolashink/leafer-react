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
import useLeaferProps from '../hooks/useLeaferProps';
import { useLeaferView } from '../hooks/useLeaferView';
import type { MoveEvent } from '../types/editor';

export interface LeaferAppRef {
  leaferApp: App | null;
  editor?: IEditorBase;
  zoom?: ILeafer['zoom'];
}

export interface AppProps extends IAppConfig {
  children?: React.ReactNode;
  appId?: string;
  className?: string;
  ruler?: boolean;
  scrollBar?: boolean;
  disableMove?: boolean;
  disableWheel?: boolean;
  disableZoom?: boolean;
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
    scrollBar = true,
    onSelect,
    onMove,
    onScale,
    onMoveEnd,
    editor,
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
    // Listen to editor events
    app.editor?.on(EditorEvent.SELECT, onSelect);
    app.editor?.on(EditorMoveEvent.MOVE, onMove);
    app.editor?.on(EditorScaleEvent.SCALE, onScale);
    // Listen to editor's edit box drag end event to implement editor drag end event (refer to source code)
    app.editor?.editBox?.rect?.on(DragEvent.END, (e: LeaferMoveEvent) => {
      // Create new object instead of modifying readonly target property
      const event = { ...e, target: app.editor.target };
      onMoveEnd?.(event as MoveEvent);
    });
    return app;
  };

  const [leaferApp, initialized] = useLeaferComponent(initApp);

  useEffect(() => {
    rulerRef.current?.changeEnabled(ruler);
    scrollBarRef.current?.setAttr('visible', scrollBar);
  }, [ruler, scrollBar]);

  useEffect(() => {
    if (!leaferApp) return;
    requestIdleCallback(() => {
      if (leaferApp.tree.children.length) {
        leaferApp.tree.zoom(leaferApp.tree.children[0]);
      }
    });
  }, [leaferApp]);

  useLeaferView(leaferApp, props);

  useLeaferProps(leaferApp, rest);

  useImperativeHandle(ref, () => ({
    leaferApp,
    editor: leaferApp?.editor,
    zoom: leaferApp?.tree.zoom,
  }));

  return (
    <div
      className={`leafer-app-container ${className || ''}`}
      id={appId}
      style={{ width: '100%', height: '100%', flex: 1 }}
    >
      <LeaferContext.Provider
        value={editor ? (leaferApp?.tree as ILeafer) : leaferApp}
      >
        {initialized && children}
      </LeaferContext.Provider>
    </div>
  );
}

export default React.forwardRef(LeaferApp);
