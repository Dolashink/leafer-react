/*
 * @Description: Line component
 *
 * @Author: Jin
 * @Date: 2024-10-14 14:30:06
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { type ILineInputData, Line as LeaferLine } from 'leafer-ui';
import useLeaferProps from '../hooks/useLeaferCmpProps';
import useLeaferComponent from '../hooks/useLeaferComponent';

export interface ILineProps extends Omit<ILineInputData, 'children'> {}

function Line(props: ILineProps) {
  const [leaferLine] = useLeaferComponent(() => new LeaferLine(props));

  useLeaferProps(leaferLine, props);

  return null;
}

export default Line;
