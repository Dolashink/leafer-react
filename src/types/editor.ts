/*
 * @Description: Editor types
 *
 * @Author: Jin
 * @Date: 2024-10-24 10:37:56
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { EditorEvent } from '@leafer-in/editor';
import type { IEditorConfig } from '@leafer-ui/interface';
import type { MoveEvent as LeaferMoveEvent, UI } from 'leafer-ui';

interface MoveEvent extends Omit<LeaferMoveEvent, 'target'> {
  target: UI | UI[] | undefined;
}

export type * from '@leafer-in/editor';
export { EditorEvent, type MoveEvent, type IEditorConfig };
