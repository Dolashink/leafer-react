/* eslint-disable consistent-return */
/*
 * @Description: Override Editor Plugin
 *
 * @Author: Jin
 * @Date: 2024-11-13 10:23:46
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import {
  EditDataHelper,
  EditorRotateEvent,
  EditorScaleEvent,
  Editor as LeaferEditor,
} from '@leafer-in/editor';
import type { IEditBox } from '@leafer-in/interface';
import { DragEvent } from '@leafer-ui/core';
import { MathHelper } from '@leafer-ui/draw';
import {
  DataHelper,
  type IAlign,
  type IAround,
  type IEditPoint,
  type IEditorConfig,
  type IGroupInputData,
  type IMatrixData,
  type IPointData,
  RotateEvent,
  type ZoomEvent,
} from 'leafer-ui';
import EditBox from './editBox';

class Editor extends LeaferEditor {
  public editBox: IEditBox = new EditBox(this);

  private lastInnerPoint: IPointData = { x: 0, y: 0 };

  // eslint-disable-next-line no-useless-constructor
  constructor(userConfig?: IEditorConfig, data?: IGroupInputData) {
    super(userConfig, data);
    if (userConfig) this.config = DataHelper.default(userConfig, this.config);
    this.addMany(this.editMask, this.selector, this.editBox);
  }

  public onScaleEnd(e: DragEvent | ZoomEvent) {
    const { element } = this;
    let { lockRatio } = this.mergeConfig;
    const { around, flipable, editSize } = this.mergeConfig;
    const { direction } = e.current as IEditPoint;
    if (e.shiftKey || this.element.lockRatio) lockRatio = true;
    if (!around) return;
    const data = EditDataHelper.getScaleData(
      element,
      this.dragStartBounds,
      direction,
      (e as DragEvent).getInnerTotal(element),
      !!lockRatio,
      EditDataHelper.getAround(around, e.altKey),
      !!flipable,
      this.multiple || editSize === 'scale',
    );
    const event = new EditorScaleEvent('editor.scaleEnd', {
      ...data,
      target: element,
      editor: this,
      worldOrigin: element.getWorldPoint(data.origin as IPointData),
    });
    this.emitEvent(event);
  }

  public override onRotate(e: DragEvent | RotateEvent): void {
    super.onRotate(e);
    if (e instanceof DragEvent) {
      const last = { x: e.x - e.moveX, y: e.y - e.moveY };
      this.lastInnerPoint = this.element.getInnerPoint(last);
    }
  }

  // eslint-disable-next-line consistent-return
  public onRotateEnd(e: DragEvent | RotateEvent): void {
    const { skewable, rotateable, around, rotateGap } = this.mergeConfig;
    const { direction, name } = e.current as IEditPoint;
    // biome-ignore lint/correctness/noVoidTypeReturn: <explanation>
    if (skewable && name === 'resize-line') return this.onSkew(e as DragEvent);

    const { element } = this;
    let origin: IPointData;
    let rotation: number;

    if (e instanceof RotateEvent) {
      if (rotateable === 'rotate') {
        e.stop();
        rotation = e.rotation;
        origin = element.getInnerPoint(e);
      } else return;
    } else {
      const last = { x: e.x - e.moveX, y: e.y - e.moveY };
      const data = EditDataHelper.getRotateData(
        element.boxBounds,
        direction,
        e.getInner(element),
        this.lastInnerPoint || element.getInnerPoint(last),
        (e.shiftKey
          ? null
          : element.around || element.origin || around || 'center') as IAround,
      );
      rotation = data.rotation as number;
      origin = data.origin as IPointData;
    }

    rotation = MathHelper.getGapRotation(
      rotation,
      rotateGap as number,
      element.rotation,
    );

    if (!element.scaleX || !element.scaleY) return;
    if (element.scaleX * element.scaleY < 0) rotation = -rotation; // flippedOne

    this.rotateEndOf(origin, MathHelper.float(rotation, 2));
  }

  public rotateEndOf(origin: IPointData | IAlign, rotation: number): void {
    if (!this.mergeConfig.rotateable || this.element.locked) return;

    const { element } = this;
    const worldOrigin = this.getWorldOrigin(origin);
    const transform =
      this.multiple &&
      this.getChangedTransform(() => element.rotateOf(origin, rotation));
    const event = new EditorRotateEvent('editor.rotateEnd', {
      target: element,
      editor: this,
      worldOrigin,
      rotation,
      transform: transform as IMatrixData,
    });

    this.editTool?.onRotate(event);
    this.emitEvent(event);
  }
}

export default Editor;
