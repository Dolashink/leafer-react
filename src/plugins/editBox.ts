/*
 * @Description: Override EditBox Plugin
 *
 * @Author: Jin
 * @Date: 2024-11-13 10:32:21
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { EditBox as LeaferEditorBox } from '@leafer-in/editor';
import type { IEditor as ILeaferEditor } from '@leafer-in/interface';
import type { DragEvent } from '@leafer-ui/core';
import type { IEditPoint } from 'leafer-ui';

interface IEditor extends ILeaferEditor {
  onScaleEnd: (e: DragEvent) => void;
  onRotateEnd: (e: DragEvent) => void;
}

class CustomEditBox extends LeaferEditorBox {
  // eslint-disable-next-line no-useless-constructor
  // biome-ignore lint/complexity/noUselessConstructor: <explanation>
  constructor(editor: IEditor) {
    super(editor);
  }

  override onDragEnd(e: DragEvent): void {
    super.onDragEnd(e);
    // eslint-disable-next-line no-multi-assign
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    const point = (this.enterPoint = e.current as IEditPoint);

    if (
      point.pointType === 'rotate' ||
      e.metaKey ||
      e.ctrlKey ||
      !this.editor.mergeConfig.resizeable
    ) {
      // When drag ends, if it's rotate, call onRotateEnd
      if (this.editor.mergeConfig.rotateable)
        (this.editor as IEditor).onRotateEnd(e);
    } else if (point.pointType === 'resize') {
      // When drag ends, if it's resize, call onScaleEnd
      (this.editor as IEditor).onScaleEnd(e);
    }
  }
}

export default CustomEditBox;
