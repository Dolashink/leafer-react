/*
 * @Description: Path component
 *
 * @Author: Jin
 * @Date: 2024-10-14 14:51:27
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { type IPathInputData, Path as LeaferPath } from 'leafer-ui';
import useLeaferComponent from '../hooks/useLeaferComponent';
import useLeaferProps from '../hooks/useLeaferProps';

export interface IPathProps extends Omit<IPathInputData, 'children'> {}

function Path(props: IPathProps) {
  const [leaferPath] = useLeaferComponent(() => new LeaferPath(props));

  useLeaferProps(leaferPath, props);

  return null;
}

export default Path;
