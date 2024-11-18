/*
 * @Description: Group component
 *
 * @Author: Jin
 * @Date: 2024-10-14 10:59:38
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { type IGroupInputData, Group as LeaferGroup } from 'leafer-ui';
import type React from 'react';
import { LeaferContext } from '../context/leaferContext';
import useLeaferProps from '../hooks/useLeaferCmpProps';
import useLeaferComponent from '../hooks/useLeaferComponent';

export interface IGroupProps extends Omit<IGroupInputData, 'children'> {
  children?: React.ReactNode;
}

function Group(props: IGroupProps) {
  const { children, ...rest } = props;

  const [leaferGroup, initialized] = useLeaferComponent(
    () => new LeaferGroup(rest),
  );

  useLeaferProps(leaferGroup, rest);

  return (
    <LeaferContext.Provider value={leaferGroup}>
      {initialized && children}
    </LeaferContext.Provider>
  );
}

export default Group;
