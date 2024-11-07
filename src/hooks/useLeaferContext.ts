/*
 * @Description: Get Leafer component context
 *
 * @Author: Jin
 * @Date: 2024-10-16 10:20:06
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { useContext } from 'react';
import { LeaferContext } from '../context/leaferContext';

/**
 * Custom hook for getting Leafer component context
 * @template T Component type
 * @returns {T} Component instance
 */
export function useLeaferContext<T>() {
  return useContext(LeaferContext) as T;
}
