import React from 'react';
import { Box, LeaferApp } from '../src';

const LeaferBox = ({ x, y, fill, width, height }) => {
  return (
    <LeaferApp fill={'#f5f5f5'} editor={{}}>
      <Box x={x} y={y} width={width} height={height} fill={fill} />
    </LeaferApp>
  );
};

export default {
  title: 'Example/Box',
  component: LeaferBox,
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
    width: 300,
    height: 300,
    fill: '#ffffff',
  },
};
