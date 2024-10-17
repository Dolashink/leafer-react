/*
 * @Description: Line component
 * 
 * @Author: Jin
 * @Date: 2024-10-14 14:30:06
 * 
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { Line as LeaferLine, ILineInputData } from "leafer-ui";
import useLeaferComponent from "../hooks/useLeaferComponent";
import { useRef } from "react";

function Line(props: ILineInputData) {
  const lineRef = useRef<LeaferLine>(new LeaferLine(props));

  useLeaferComponent(() => lineRef.current);

  return null;
}

export default Line;