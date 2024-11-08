/*
 * @Description: Text component
 *
 * @Author: Jin
 * @Date: 2024-10-14 19:00:21
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { type ITextInputData, Text as LeaferText } from 'leafer-ui';
import useLeaferComponent from '../hooks/useLeaferComponent';
import useLeaferProps from '../hooks/useLeaferProps';

export interface ITextProps extends Omit<ITextInputData, 'children'> {}

function Text(props: ITextProps) {
  const [leaferText] = useLeaferComponent(() => new LeaferText(props));

  useLeaferProps(leaferText, props);

  return null;
}

export default Text;
