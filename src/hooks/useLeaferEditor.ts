/*
 * @Description: Leafer Editor Hook
 *
 * @Author: Jin
 * @Date: 2024-11-15 15:28:29
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */
import type { App, UI } from 'leafer-ui';
import { useEffect } from 'react';
import type { AppProps } from '../components/app';

export const useLeaferEditor = (app: App | null, props: AppProps) => {
  useEffect(() => {
    if (!app || !app.editor) return;

    if (props.selectedIds) {
      try {
        const selectedUI = props.selectedIds.map(id => app.tree.findId(id));
        app.editor.select(selectedUI as UI[]);
      } catch (error) {
        console.error(error);
      }
    }

    if (props.hoveredId) {
      try {
        app.editor.hoverTarget = app.tree.findId(props.hoveredId);
      } catch (error) {
        console.log(error);
      }
    }
  }, [app, props]);
};
