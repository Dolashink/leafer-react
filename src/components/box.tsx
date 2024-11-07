/*
 * @Description: Box component
 *
 * @Author: Jin
 * @Date: 2024-10-14 11:04:10
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { type IBoxInputData, Box as LeaferBox } from 'leafer-ui';
import type React from 'react';
import { LeaferContext } from '../context/leaferContext';
import useLeaferComponent from '../hooks/useLeaferComponent';

export interface IBoxProps extends Omit<IBoxInputData, 'children'> {
  children?: React.ReactNode;
}

function Box(props: IBoxProps) {
  const { children, ...rest } = props;

  const [initialized, leaferBox] = useLeaferComponent(
    () => new LeaferBox(rest),
  );

  return (
    <LeaferContext.Provider value={leaferBox}>
      {initialized && children}
    </LeaferContext.Provider>
  );
}

export default Box;
