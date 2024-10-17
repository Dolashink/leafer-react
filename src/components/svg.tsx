/*
 * @Description: SVG component
 * 
 * @Author: Jin
 * @Date: 2024-10-14 15:49:22
 * 
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { Image as LeaferImage, Rect as LeaferRect, IImageInputData, Platform } from "leafer-ui";
import useLeaferComponent from "../hooks/useLeaferComponent";
import { useRef } from "react";

interface ISvgProps extends IImageInputData {
  url: string;
  fillMode?: boolean;
}

const defaultSvgConfig: IImageInputData = {
    editable: true
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
        type: "image",
        url: svg,
        mode: "stretch",
      },
    });
  }

  const svgRef = useRef<LeaferImage | LeaferRect>(
    createSvg()
  );
  
  useLeaferComponent(() => svgRef.current);

  return null;
}

export default Svg;