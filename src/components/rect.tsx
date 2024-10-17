/*
 * @Description: Rectangle component
 *
 * @Author: Jin
 * @Date: 2024-08-28 14:44:30
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { Rect as LeaferRect, IRectInputData } from "leafer-ui";
import useLeaferComponent from "../hooks/useLeaferComponent";
import { useRef } from "react";

function Rect(props: IRectInputData) {
  const rectRef = useRef<LeaferRect>(new LeaferRect(props));

  useLeaferComponent(()=>rectRef.current);

  return null;
}

export default Rect;
