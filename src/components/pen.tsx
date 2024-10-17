/*
 * @Description: Pen component
 * 
 * @Author: Jin
 * @Date: 2024-10-14 15:01:27
 * 
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { Pen as LeaferPen, IPenInputData } from "leafer-ui";
import useLeaferComponent from "../hooks/useLeaferComponent";
import { useRef } from "react";


function Pen(props: IPenInputData) {
  const penRef = useRef<LeaferPen>(new LeaferPen(props));
  
  useLeaferComponent(() => penRef.current);

  return null;
}

export default Pen;