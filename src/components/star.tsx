/*
 * @Description: Star component
 *
 * @Author: Jin
 * @Date: 2024-10-14 14:46:54
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { type IStarInputData, Star as LeaferStar } from 'leafer-ui';
import useLeaferComponent from '../hooks/useLeaferComponent';

export interface IStarProps extends Omit<IStarInputData, 'children'> {}

function Star(props: IStarProps) {
  useLeaferComponent(() => new LeaferStar(props));

  return null;
}

export default Star;
