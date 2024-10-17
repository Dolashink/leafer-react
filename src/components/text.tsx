/*
 * @Description: 请补充模块描述
 * 
 * @Author: Jin
 * @Date: 2024-10-14 19:00:21
 * 
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { Text as LeaferText, ITextInputData } from "leafer-ui";
import useLeaferComponent from "../hooks/useLeaferComponent";
import { useRef } from "react";

function Text(props: ITextInputData) {
  const textRef = useRef<LeaferText>(
    new LeaferText(props),
  );

  useLeaferComponent(() => textRef.current);

  return null;
}

export default Text;