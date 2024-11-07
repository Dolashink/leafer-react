/*
 * @Description: Image processing utilities
 *
 * @Author: Jin
 * @Date: 2024-10-16 14:07:12
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import * as fabric from 'fabric';
import {
  type BaseFilter,
  type BlendColorFilter,
  type BlurFilter,
  type BrightnessFilter,
  type ContrastFilter,
  FilterType,
  type GammaFilter,
  type GrayscaleFilter,
  type HueRotationFilter,
  type NoiseFilter,
  type PixelateFilter,
  type RemoveColorFilter,
  type SaturationFilter,
  type VibranceFilter,
} from '../types/filters';

let webFilterBackend: fabric.WebGLFilterBackend | null = null;

export type IBaseFilter = fabric.filters.BaseFilter<
  string,
  Record<string, any>
>[];

export const getImageDataUrl = (image: fabric.Image) => {
  return image.toDataURL();
};

export function getWebFilterBackend() {
  if (webFilterBackend) return webFilterBackend;
  const webglBackend = new fabric.WebGLFilterBackend();
  fabric.setFilterBackend(webglBackend);
  webFilterBackend = fabric.getFilterBackend() as fabric.WebGLFilterBackend;
  return webFilterBackend;
}

/**
 * Generate fabric filter instances based on the input filter configuration
 * @param {BaseFilter} filter Filter configuration array
 * @returns {fabric.filters.BaseFilter[] | null} Array of fabric filter instances or null
 */
export function getImageFilter(originFilter?: BaseFilter[]): IBaseFilter {
  if (!originFilter) return [];
  const filters = originFilter.map(f => {
    switch (f.type) {
      case FilterType.Brightness:
        return new fabric.filters.Brightness({
          brightness: (f as BrightnessFilter).brightness,
        });
      case FilterType.Grayscale:
        return new fabric.filters.Grayscale({
          mode: (f as GrayscaleFilter).mode,
        });
      case FilterType.Invert:
        return new fabric.filters.Invert();
      case FilterType.Sepia:
        return new fabric.filters.Sepia();
      case FilterType.BlackWhite:
        return new fabric.filters.BlackWhite();
      case FilterType.Brownie:
        return new fabric.filters.Brownie();
      case FilterType.Vintage:
        return new fabric.filters.Vintage();
      case FilterType.Kodachrome:
        return new fabric.filters.Kodachrome();
      case FilterType.Technicolor:
        return new fabric.filters.Technicolor();
      case FilterType.Polaroid:
        return new fabric.filters.Polaroid();
      case FilterType.RemoveColor:
        return new fabric.filters.RemoveColor({
          color: (f as RemoveColorFilter).color,
          distance: (f as RemoveColorFilter).distance,
        });
      case FilterType.Gamma:
        return new fabric.filters.Gamma({
          gamma: (f as GammaFilter).gamma,
        });
      case FilterType.Contrast:
        return new fabric.filters.Contrast({
          contrast: (f as ContrastFilter).contrast,
        });
      case FilterType.Saturation:
        return new fabric.filters.Saturation({
          saturation: (f as SaturationFilter).saturation,
        });
      case FilterType.Vibrance:
        return new fabric.filters.Vibrance({
          vibrance: (f as VibranceFilter).vibrance,
        });
      case FilterType.HueRotation:
        return new fabric.filters.HueRotation({
          rotation: (f as HueRotationFilter).rotation,
        });
      case FilterType.Noise:
        return new fabric.filters.Noise({
          noise: (f as NoiseFilter).noise,
        });
      case FilterType.Pixelate:
        return new fabric.filters.Pixelate({
          blocksize: (f as PixelateFilter).blocksize,
        });
      case FilterType.Blur:
        return new fabric.filters.Blur({
          blur: (f as BlurFilter).blur,
        });
      case FilterType.Sharpen:
        return new fabric.filters.Convolute({
          matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
        });
      case FilterType.Emboss:
        return new fabric.filters.Convolute({
          matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
        });
      case FilterType.BlendColor:
        return new fabric.filters.BlendColor({
          color: (f as BlendColorFilter).color,
          mode: (f as BlendColorFilter).mode,
          alpha: (f as BlendColorFilter).alpha,
        });
      default:
        return null;
    }
  }) as IBaseFilter;

  return filters;
}

export const imageFilters = fabric.filters;
