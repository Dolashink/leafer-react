/*
 * @Description: Ellipse component
 *
 * @Author: Jin
 * @Date: 2024-10-14 14:18:17
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { type IEllipseInputData, Ellipse as LeaferEllipse } from 'leafer-ui';
import useLeaferProps from '../hooks/useLeaferCmpProps';
import useLeaferComponent from '../hooks/useLeaferComponent';

export interface IEllipseProps extends Omit<IEllipseInputData, 'children'> {}

function Ellipse(props: IEllipseProps) {
  const [leaferEllipse] = useLeaferComponent(() => new LeaferEllipse(props));

  useLeaferProps(leaferEllipse, props);

  return null;
}

export default Ellipse;
