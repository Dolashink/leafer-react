import React from 'react';
import { LeaferApp } from '../src';

const LeaferAppComponent = ({
  fill,
  ruler,
  scrollBar,
  editor,
  disableMove,
  disableWheel,
  disableZoom,
}) => {
  return (
    <LeaferApp
      fill={fill}
      ruler={ruler}
      scrollBar={scrollBar}
      editor={editor}
      disableMove={disableMove}
      disableWheel={disableWheel}
      disableZoom={disableZoom}
    />
  );
};

export default {
  title: 'Example/LeaferApp',
  component: LeaferAppComponent,
  argTypes: {
    fill: { control: 'color' },
    ruler: { control: 'boolean' },
    scrollBar: { control: 'boolean' },
    editor: { control: 'object' },
    disableMove: { control: 'boolean' },
    disableWheel: { control: 'boolean' },
    disableZoom: { control: 'boolean' },
  },
};

export const Primary = {
  args: {
    fill: '#f5f5f5',
    ruler: true,
    scrollBar: true,
    editor: {},
    disableMove: false,
    disableWheel: false,
    disableZoom: false,
  },
};
