/*
 * @Description: 请补充模块描述
 *
 * @Author: Jin
 * @Date: 2024-11-08 15:49:58
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import React from 'react';
import { Image, LeaferApp } from '../src';

const LeaferImage = ({ x, y, width, height, editable, objectFit }) => {
  return (
    <LeaferApp fill={'#f5f5f5'} editor={{}}>
      <Image
        fill={{
          type: 'image',
          url: 'https://img1.baidu.com/it/u=259106471,2671512290&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1062',
          mode: 'fit',
        }}
        x={x}
        y={y}
        width={width}
        height={height}
        editable={editable}
        objectFit={objectFit}
      />
    </LeaferApp>
  );
};

export default {
  title: 'Example/Image',
  component: LeaferImage,
  argTypes: {
    x: { control: 'number' },
    y: { control: 'number' },
    width: { control: 'number' },
    height: { control: 'number' },
    editable: { control: 'boolean' },
    objectFit: { control: 'select', options: ['fill', 'cover', 'contain'] },
  },
};

export const Primary = {
  args: {
    x: 0,
    y: 0,
    width: 400,
    height: 531,
    editable: false,
    objectFit: 'fill',
  },
};
