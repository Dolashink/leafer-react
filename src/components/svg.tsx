/*
 * @Description: SVG component
 *
 * @Author: Jin
 * @Date: 2024-10-14 15:49:22
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import {
  type IImageInputData,
  Image as LeaferImage,
  Rect as LeaferRect,
  Platform,
} from 'leafer-ui';
import useLeaferComponent from '../hooks/useLeaferComponent';
import useLeaferProps from '../hooks/useLeaferProps';

export interface ISvgProps extends Omit<IImageInputData, 'children'> {
  url: string;
  fillMode?: boolean;
}

const defaultSvgConfig: IImageInputData = {
  editable: true,
};

function Svg(props: ISvgProps) {
  const { url, fillMode, ...rest } = props;

  const isSvgString = url?.trim().startsWith('<svg');

  const createSvg = () => {
    const svg = isSvgString ? Platform.toURL(url, 'svg') : url;

    if (!fillMode) {
      return new LeaferImage({ ...defaultSvgConfig, ...rest, url: svg });
    }

    return new LeaferRect({
      ...defaultSvgConfig,
      ...rest,
      fill: {
        type: 'image',
        url: svg,
        mode: 'stretch',
      },
    });
  };

  const [leaferSvg] = useLeaferComponent(createSvg);

  useLeaferProps(leaferSvg, props);

  return null;
}

export default Svg;
