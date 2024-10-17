/*
 * @Description: Ellipse component
 * 
 * @Author: Jin
 * @Date: 2024-10-14 14:18:17
 * 
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { Ellipse as LeaferEllipse, IEllipseInputData } from "leafer-ui";
import useLeaferComponent from "../hooks/useLeaferComponent";
import { useRef } from "react";

function Ellipse(props: IEllipseInputData) {
  const ellipseRef = useRef<LeaferEllipse>(new LeaferEllipse(props));

  useLeaferComponent(() => ellipseRef.current);

  return null;
}

export default Ellipse;
