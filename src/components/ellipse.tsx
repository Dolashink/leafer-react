/*
 * @Description: Ellipse component
 *
 * @Author: Jin
 * @Date: 2024-10-14 14:18:17
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { type IEllipseInputData, Ellipse as LeaferEllipse } from 'leafer-ui';
import useLeaferComponent from '../hooks/useLeaferComponent';

export interface IEllipseProps extends Omit<IEllipseInputData, 'children'> {}

function Ellipse(props: IEllipseProps) {
  useLeaferComponent(() => new LeaferEllipse(props));

  return null;
}

export default Ellipse;
