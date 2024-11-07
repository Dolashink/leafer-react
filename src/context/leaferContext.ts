/*
 * @Description: Leafer Context
 *
 * @Author: Jin
 * @Date: 2024-10-12 15:04:39
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import type { ILeafer, UI } from 'leafer-ui';
import { createContext } from 'react';

export const LeaferContext = createContext<ILeafer | UI | null>(null);
