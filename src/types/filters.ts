/*
 * @Description: Filter types
 *
 * @Author: Jin
 * @Date: 2024-11-05 10:29:05
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

export enum FilterType {
  Brightness = 'brightness',
  Grayscale = 'grayscale',
  Invert = 'invert',
  Sepia = 'sepia',
  BlackWhite = 'blackWhite',
  Brownie = 'brownie',
  Vintage = 'vintage',
  Kodachrome = 'kodachrome',
  Technicolor = 'technicolor',
  Polaroid = 'polaroid',
  RemoveColor = 'removeColor',
  Gamma = 'gamma',
  Contrast = 'contrast',
  Saturation = 'saturation',
  Vibrance = 'vibrance',
  HueRotation = 'hueRotation',
  Noise = 'noise',
  Pixelate = 'pixelate',
  Blur = 'blur',
  Sharpen = 'sharpen',
  Emboss = 'emboss',
  BlendColor = 'blendColor',
  BlendImage = 'blendImage',
}

export interface BaseFilter {
  type: FilterType;
  enabled: boolean;
}

export interface BrightnessFilter extends BaseFilter {
  brightness: number;
}

export enum GrayscaleMode {
  Average = 'average',
  Lightness = 'lightness',
  Luminosity = 'luminosity',
}

export interface GrayscaleFilter extends BaseFilter {
  mode: GrayscaleMode;
}

export interface InvertFilter extends BaseFilter {}

export interface SepiaFilter extends BaseFilter {}

export interface BlackWhiteFilter extends BaseFilter {}

export interface BrownieFilter extends BaseFilter {}

export interface VintageFilter extends BaseFilter {}

export interface KodachromeFilter extends BaseFilter {}

export interface TechnicolorFilter extends BaseFilter {}

export interface PolaroidFilter extends BaseFilter {}

export interface RemoveColorFilter extends BaseFilter {
  color: string;
  distance: number;
}

export type GammaInput = [number, number, number];
export interface GammaFilter extends BaseFilter {
  gamma: GammaInput;
}

export interface ContrastFilter extends BaseFilter {
  contrast: number;
}

export interface SaturationFilter extends BaseFilter {
  saturation: number;
}

export interface VibranceFilter extends BaseFilter {
  vibrance: number;
}

export interface HueRotationFilter extends BaseFilter {
  rotation: number;
}

export interface NoiseFilter extends BaseFilter {
  noise: number;
}

export interface PixelateFilter extends BaseFilter {
  blocksize: number;
}

export interface BlurFilter extends BaseFilter {
  blur: number;
}

export interface SharpenFilter extends BaseFilter {}

export interface EmbossFilter extends BaseFilter {}

export type TBlendMode =
  | 'multiply'
  | 'add'
  | 'difference'
  | 'screen'
  | 'subtract'
  | 'darken'
  | 'lighten'
  | 'overlay'
  | 'exclusion'
  | 'tint';

export interface BlendColorFilter extends BaseFilter {
  color: string;
  mode: TBlendMode;
  alpha: number;
}

export interface BlendImageFilter extends BaseFilter {
  image: string;
  mode: TBlendMode;
  alpha: number;
}
