/*
 * @Description: Image component
 * 
 * @Author: Jin
 * @Date: 2024-10-14 15:31:22
 * 
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { Image as LeaferImage, IImageInputData, ImageEvent } from "leafer-ui";
import useLeaferComponent from "../hooks/useLeaferComponent";
import { useRef } from "react";

interface IImageProps extends IImageInputData {
  onLoad?: () => void;
  onLoaded?: () => void;
  onError?: (error: Error) => void;
}

function Image(props: IImageProps) {

  const { onError, onLoad, onLoaded } = props;

  const imageRef = useRef<LeaferImage>(new LeaferImage(props));

  imageRef.current.once(ImageEvent.LOAD, () => {
    onLoad?.();
  });

  imageRef.current.once(ImageEvent.LOADED, () => {
    onLoaded?.();
  });

  imageRef.current.once(ImageEvent.ERROR, (error) => {
    onError?.(error);
  });

  useLeaferComponent(() => imageRef.current);
  
  return null;
}

export default Image;