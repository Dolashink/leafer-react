/*
 * @Description: Rectangle component
 *
 * @Author: Jin
 * @Date: 2024-08-28 14:44:30
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { type IRectInputData, Rect as LeaferRect } from 'leafer-ui';
import useLeaferProps from '../hooks/useLeaferCmpProps';
import useLeaferComponent from '../hooks/useLeaferComponent';

export interface IRectProps extends Omit<IRectInputData, 'children'> {}

function Rect(props: IRectProps) {
  const [leaferRect] = useLeaferComponent(() => new LeaferRect(props));

  useLeaferProps(leaferRect, props);

  return null;
}

export default Rect;
