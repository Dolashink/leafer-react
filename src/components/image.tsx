/*
 * @Description: Image component
 *
 * @Author: Jin
 * @Date: 2024-10-14 15:31:22
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { ImageEvent } from 'leafer-ui';
import { useEffect } from 'react';
import useLeaferProps from '../hooks/useLeaferCmpProps';
import useLeaferComponent from '../hooks/useLeaferComponent';
import {
  CustomImage,
  type FitMode,
  type ICustomInputData,
} from './custom/image';

export interface IImageProps extends Omit<ICustomInputData, 'children'> {
  objectFit?: FitMode;
  onLoad?: () => void;
  onLoaded?: () => void;
  onError?: (error: Error) => void;
}

function Image(props: IImageProps) {
  const { onError, onLoad, onLoaded } = props;

  const initImage = () => {
    const image = new CustomImage(props);

    image.once(ImageEvent.LOAD, () => {
      onLoad?.();
    });
    image.once(ImageEvent.LOADED, () => {
      onLoaded?.();
    });
    image.once(ImageEvent.ERROR, error => {
      onError?.(error);
    });

    return image;
  };

  const [image] = useLeaferComponent(initImage);

  useEffect(() => {
    if (image) {
      image.applyFilters(props.filters);
    }
  }, [image, props.filters]);

  useEffect(() => {
    if (image && props.objectFit) {
      image.objectFit = props.objectFit;
      image.forceUpdate();
    }
  }, [image, props.objectFit]);

  useLeaferProps(image, props);

  return null;
}

export default Image;
