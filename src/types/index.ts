/*
 * @Description: types
 *
 * @Author: Jin
 * @Date: 2024-10-23 15:23:31
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import type { IUIBaseInputData } from '@leafer-ui/interface';
import type React from 'react';

export interface IBaseProps extends Omit<IUIBaseInputData, 'children'> {
  children?: React.ReactNode;
}
