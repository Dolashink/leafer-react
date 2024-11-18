/*
 * @Description: Pen component
 *
 * @Author: Jin
 * @Date: 2024-10-14 15:01:27
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { type IPenInputData, Pen as LeaferPen } from 'leafer-ui';
import useLeaferProps from '../hooks/useLeaferCmpProps';
import useLeaferComponent from '../hooks/useLeaferComponent';

export interface IPenProps extends Omit<IPenInputData, 'children'> {}

function Pen(props: IPenProps) {
  const [leaferPen] = useLeaferComponent(() => new LeaferPen(props));

  useLeaferProps(leaferPen, props);

  return null;
}

export default Pen;
