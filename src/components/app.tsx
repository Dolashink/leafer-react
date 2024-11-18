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
  EditorRotateEvent,
  EditorScaleEvent,
} from '@leafer-in/editor';
import {
  App,
  DragEvent,
  type IAppConfig,
  type IEditorBase,
  type ILeafer,
  type IPointerEvent,
  type MoveEvent as LeaferMoveEvent,
  PointerEvent,
} from 'leafer-ui';
import React, { useEffect, useImperativeHandle, useRef } from 'react';
import { LeaferContext } from '../context/leaferContext';
import useLeaferComponent from '../hooks/useLeaferComponent';
import '@leafer-in/view';
import { ScrollBar } from '@leafer-in/scroll';
import { Ruler } from 'leafer-x-ruler';
import useLeaferCmpProps from '../hooks/useLeaferCmpProps';
import { useLeaferEditor } from '../hooks/useLeaferEditor';
import { useLeaferView } from '../hooks/useLeaferView';
import Editor from '../plugins/editor';
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
  selectedIds?: string[];
  hoveredId?: string;
  onSelect?: (e: EditorEvent) => void;
  onMove?: (e: EditorMoveEvent) => void;
  onMoveEnd?: (e: MoveEvent) => void;
  onScale?: (e: EditorScaleEvent) => void;
  onScaleEnd?: (e: EditorScaleEvent) => void;
  onRotate?: (e: EditorRotateEvent) => void;
  onRotateEnd?: (e: EditorRotateEvent) => void;
  onMenuTap?: (e: IPointerEvent) => void;
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
    onScaleEnd,
    onMoveEnd,
    onRotate,
    onRotateEnd,
    onMenuTap,
    editor,
    ...rest
  } = props;
  const rulerRef = useRef<Ruler | null>(null);
  const scrollBarRef = useRef<ScrollBar | null>(null);

  const initApp = () => {
    const app = new App({ view: appId, ...rest });
    app.tree = app.addLeafer();
    app.sky = app.addLeafer({ type: 'draw', usePartRender: false });

    app.editor = new Editor(editor);

    app.sky.add(app.editor);
    if (app.sky) {
      rulerRef.current = new Ruler(app);
      scrollBarRef.current = new ScrollBar(app);
    }
    // Listen to editor events
    app.editor?.on(EditorEvent.SELECT, onSelect);
    app.editor?.on(EditorMoveEvent.MOVE, onMove);
    app.editor?.on(EditorScaleEvent.SCALE, onScale);
    app.editor?.on(EditorRotateEvent.ROTATE, onRotate);
    app.editor?.on('editor.scaleEnd', (e: EditorScaleEvent) => {
      const event = { ...e, target: app.editor.target };
      onScaleEnd?.(event as EditorScaleEvent);
    });
    // Listen to editor's edit box drag end event to implement editor drag end event (refer to source code)
    app.editor?.editBox?.rect?.on(DragEvent.END, (e: LeaferMoveEvent) => {
      // Create new object instead of modifying readonly target property
      const event = { ...e, target: app.editor.target };
      onMoveEnd?.(event as MoveEvent);
    });
    // Listen to editor's rotate end event
    app.editor?.on('editor.rotateEnd', e => {
      const event = { ...e, target: app.editor.target };
      onRotateEnd?.(event as EditorRotateEvent);
    });
    app.on(PointerEvent.MENU_TAP, onMenuTap);
    return app;
  };

  const [leaferApp, initialized] = useLeaferComponent(initApp);

  useEffect(() => {
    rulerRef.current?.changeEnabled(ruler);
    scrollBarRef.current?.setAttr('visible', scrollBar);
  }, [ruler, scrollBar]);

  useEffect(() => {
    requestIdleCallback(() => {
      if (leaferApp?.tree.children.length) {
        leaferApp.tree.zoom(leaferApp.tree.children[0]);
      }
    });
  }, [leaferApp]);

  useLeaferView(leaferApp, props);

  useLeaferEditor(leaferApp, props);

  useLeaferCmpProps(leaferApp, rest);

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
