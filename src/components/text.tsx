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

export interface ITextProps extends Omit<ITextInputData, 'children'> {}

function Text(props: ITextProps) {
  useLeaferComponent(() => new LeaferText(props));

  return null;
}

export default Text;
