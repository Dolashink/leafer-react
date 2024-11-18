/*
 * @Description: Polygon component
 *
 * @Author: Jin
 * @Date: 2024-10-14 14:40:44
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { type IPolygonInputData, Polygon as LeaferPolygon } from 'leafer-ui';
import useLeaferProps from '../hooks/useLeaferCmpProps';
import useLeaferComponent from '../hooks/useLeaferComponent';

export interface IPolygonProps extends Omit<IPolygonInputData, 'children'> {}

function Polygon(props: IPolygonProps) {
  const [leaferPolygon] = useLeaferComponent(() => new LeaferPolygon(props));

  useLeaferProps(leaferPolygon, props);

  return null;
}

export default Polygon;
