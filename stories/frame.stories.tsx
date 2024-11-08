import React from 'react';
import { Frame, LeaferApp } from '../src';

const LeaferAppComponent = ({ fill, width, height }) => {
  return (
    <LeaferApp fill={'#f5f5f5'}>
      <Frame width={width} height={height} fill={fill} />
    </LeaferApp>
  );
};

export default {
  title: 'Example/Frame',
  component: LeaferAppComponent,
  argTypes: {
    fill: { control: 'color' },
    width: { control: 'number' },
    height: { control: 'number' },
  },
};

export const Primary = {
  args: {
    fill: '#ffffff',
    width: 375,
    height: 667,
  },
};
