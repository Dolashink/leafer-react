/*
 * @Description: Star component
 * 
 * @Author: Jin
 * @Date: 2024-10-14 14:46:54
 * 
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { Star as LeaferStar, IStarInputData } from "leafer-ui";
import useLeaferComponent from "../hooks/useLeaferComponent";
import { useRef } from "react";

function Star(props: IStarInputData) {
  const starRef = useRef<LeaferStar>(
    new LeaferStar(props),
  );
  
  useLeaferComponent(() => starRef.current);

  return null;
}

export default Star;