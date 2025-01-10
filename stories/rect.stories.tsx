/*
 * @Description: 请补充模块描述
 *
 * @Author: Jin
 * @Date: 2024-12-26 18:07:15
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import React from 'react';
import { LeaferApp, Rect } from '../src';

const LeaferRect = ({ x, y, fill, width, height }) => {
  return (
    <LeaferApp fill={'#f5f5f5'} editor={{}}>
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        editable={true}
        fill={fill}
      />
    </LeaferApp>
  );
};

export default {
  title: 'Example/Rect',
  component: LeaferRect,
  argTypes: {
    x: { control: 'number' },
    y: { control: 'number' },
    width: { control: 'number' },
    height: { control: 'number' },
    fill: { control: 'color' },
  },
};

export const Primary = {
  args: {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    fill: '#333333',
  },
};
