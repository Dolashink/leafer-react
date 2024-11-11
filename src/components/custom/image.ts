/*
 * @Description: Custom image component
 *
 * @Author: Jin
 * @Date: 2024-10-29 14:16:11
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

// eslint-disable-next-line max-classes-per-file
import type {
  ILeaferCanvas,
  ILeaferImage,
  IRadiusPointData,
  IRenderOptions,
  IUIData,
  IUIInputData,
} from '@leafer-ui/interface';
import {
  ImageEvent,
  LeaferImage,
  UI,
  UIData,
  dataProcessor,
  registerUI,
} from 'leafer-ui';

import { type IBaseFilter, getWebFilterBackend } from '../../utils/image';

// Define data

export type FitMode = 'fill' | 'cover';

export interface ICustomInputData extends IUIInputData {
  url?: string;
  filters?: IBaseFilter;
  objectFit?: FitMode;
}

export interface ICustomData extends IUIData {}

export class CustomData extends UIData implements ICustomData {}

// Define class

@registerUI()
export class CustomImage extends UI {
  public get __tag() {
    return 'CustomImage';
  }

  public url: string | undefined;

  public image?: ILeaferImage | null;

  public __element: HTMLCanvasElement;

  public __originWidth = 0;

  public __originHeight = 0;

  public objectFit: FitMode = 'fill';

  public filters: IBaseFilter = [];

  @dataProcessor(CustomData)
  public declare __: ICustomData;

  constructor(data: ICustomInputData) {
    super(data);

    this.__element = document.createElement('canvas');

    if (data.url && !data.fill) this.drawImage(data.url);

    this.objectFit = data.objectFit || 'fill';

    if (data.filters) this.filters = data.filters;

    this.on(ImageEvent.LOADED, (e: ImageEvent) => {
      this.image = e.image;
      this.width = data.width || e.image.width;
      this.height = data.height || e.image.height;
      this.__originWidth = e.image.width;
      this.__originHeight = e.image.height;
      this.__element.width = this.width;
      this.__element.height = this.height;
      if (this.filters?.length) this.applyFilters(this.filters);
      this.forceUpdate();
    });
  }

  public drawImage(url: string): void {
    this.emitEvent(new ImageEvent(ImageEvent.LOAD, {}));
    new LeaferImage({ url }).load((image: LeaferImage) => {
      if (image.ready) {
        this.emitEvent(new ImageEvent(ImageEvent.LOADED, { image }));
      }
      if (image.error) {
        this.emitEvent(
          new ImageEvent(ImageEvent.ERROR, { error: image.error }),
        );
      }
    });
  }

  // 1. If width and height properties cannot determine shape bounds, override this function to manually calculate bounds
  __updateBoxBounds(): void {
    const box = this.__layout.boxBounds;
    const { width, height } = this.__;
    if (!width || !height) return;

    box.x = 0;
    box.y = 0;
    box.width = width;
    box.height = height;
  }

  // 2. Draw collision path
  __drawHitPath(hitCanvas: ILeaferCanvas): void {
    const { context } = hitCanvas;
    const { x, y, width, height } = this.__layout.boxBounds;
    context.beginPath();
    context.rect(x, y, width, height);
  }

  // 3. Collision detection (optional), if not overridden, element needs fill or stroke value
  __hit(inner: IRadiusPointData): boolean {
    if (!this.__hitCanvas) return false;
    const { context } = this.__hitCanvas;
    if (context.isPointInPath(inner.x, inner.y)) return true;

    // Collision radius
    const lineWidth = inner.radiusX * 2; // Can add custom line width
    if (context.lineWidth !== lineWidth) {
      context.lineWidth = lineWidth;
      context.stroke();
    }

    return context.isPointInStroke(inner.x, inner.y);
  }

  // 4. Draw custom content
  __draw(canvas: ILeaferCanvas, options: IRenderOptions): void {
    const { context } = canvas;
    const { width, height } = this.__;
    if (!width || !height) return;

    canvas.setStrokeOptions(this.__); // Set stroke options before drawing stroke (optional)

    // 计算cover模式下的绘制参数
    const originRatio = this.__originWidth / this.__originHeight;
    const targetRatio = width / height;

    let sw = this.__originWidth;
    let sh = this.__originHeight;
    let sx = 0;
    let sy = 0;
    const dx = 0;
    const dy = 0;
    const dw = width;
    const dh = height;

    if (this.objectFit === 'cover') {
      if (originRatio > targetRatio) {
        // 原图更宽,需要裁剪宽度
        sw = this.__originHeight * targetRatio;
        sx = (this.__originWidth - sw) / 2;
      } else {
        // 原图更高,需要裁剪高度
        sh = this.__originWidth / targetRatio;
        sy = (this.__originHeight - sh) / 2;
      }
    }

    const imageSource =
      this.image && !this.filters?.length
        ? (this.image.view as HTMLImageElement)
        : this.__element;

    context.drawImage(imageSource, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  applyFilters(filters: IBaseFilter) {
    const webglBackend = getWebFilterBackend();
    this.filters = filters;
    if (!this.image) return;
    webglBackend.applyFilters(
      filters,
      this.image?.view as HTMLImageElement,
      this.__originWidth,
      this.__originHeight,
      this.__element,
    );
    this.forceUpdate();
  }

  public destroy(): void {
    this.image = null;
    super.destroy();
  }
}
