/*
 * @Description: Polygon component
 * 
 * @Author: Jin
 * @Date: 2024-10-14 14:40:44
 * 
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { Polygon as LeaferPolygon, IPolygonInputData } from "leafer-ui";
import useLeaferComponent from "../hooks/useLeaferComponent";
import { useRef } from "react";

function Polygon(props: IPolygonInputData) {
  const polygonRef = useRef<LeaferPolygon>(
    new LeaferPolygon(props),
  );
  useLeaferComponent(() => polygonRef.current);

  return null;
}

export default Polygon;
