/*
 * @Description: Box component
 * 
 * @Author: Jin
 * @Date: 2024-10-14 11:04:10
 * 
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { useRef } from "react";
import { Box as LeaferBox, IBoxInputData } from "leafer-ui";
import useLeaferComponent from "../hooks/useLeaferComponent";
import { LeaferContext } from "../context/leaferContext";

interface IBoxProps extends Omit<IBoxInputData, "children"> {
  children?: React.ReactNode;
}

function Box(props: IBoxProps) {
  const { children, ...rest } = props;
  const boxRef = useRef<LeaferBox>(new LeaferBox(rest));

  useLeaferComponent(() => boxRef.current);
  
  return (
    <LeaferContext.Provider value={boxRef.current}>
      {children}
    </LeaferContext.Provider>
  );
}

export default Box;
