import React from 'react';
import { Frame, LeaferApp } from '../src';

const LeaferFrame = ({ x, y, fill, width, height }) => {
  return (
    <LeaferApp fill={'#f5f5f5'} editor={{}}>
      <Frame x={x} y={y} width={width} height={height} fill={fill} />
    </LeaferApp>
  );
};

export default {
  title: 'Example/Frame',
  component: LeaferFrame,
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
    width: 350,
    height: 500,
    fill: '#ffffff',
  },
};
