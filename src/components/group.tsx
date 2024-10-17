/*
 * @Description: Group component
 * 
 * @Author: Jin
 * @Date: 2024-10-14 10:59:38
 * 
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { useRef } from "react";
import { Group as LeaferGroup, IGroupInputData } from "leafer-ui";
import useLeaferComponent from "../hooks/useLeaferComponent";
import { LeaferContext } from "../context/leaferContext";

interface IGroupProps extends Omit<IGroupInputData, "children"> {
  children?: React.ReactNode;
}

function Group(props: IGroupProps) {
  const { children, ...rest } = props;
  
  const groupRef = useRef<LeaferGroup>(new LeaferGroup(rest));

  useLeaferComponent(() => groupRef.current);

  return (
    <LeaferContext.Provider value={groupRef.current}>
      {children}
    </LeaferContext.Provider>
  );
}

export default Group;
