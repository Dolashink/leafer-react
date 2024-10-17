/*
 * @Description: 路径组件
 * 
 * @Author: Jin
 * @Date: 2024-10-14 14:51:27
 * 
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { Path as LeaferPath, IPathInputData } from "leafer-ui";
import useLeaferComponent from "../hooks/useLeaferComponent";
import { useRef } from "react";

function Path(props: IPathInputData) {
  const pathRef = useRef<LeaferPath>(
    new LeaferPath(props),
  );
  
  useLeaferComponent(() => pathRef.current);

  return null;
}

export default Path;