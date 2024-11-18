/*
 * @Description: 请补充模块描述
 *
 * @Author: Jin
 * @Date: 2024-11-07 15:32:12
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import React from 'react';
import { LeaferApp, Rect } from '../src';

const LeaferAppComponent = ({
  fill,
  ruler,
  scrollBar,
  editor,
  disableMove,
  disableWheel,
  disableZoom,
  hoveredId,
  selectedIds,
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
      hoveredId={hoveredId}
      selectedIds={selectedIds}
    >
      <Rect id={'123'} width={100} height={100} fill={'red'} editable={true} />
    </LeaferApp>
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
    hoveredId: { control: 'text' },
    selectedIds: { control: 'array' },
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
    hoveredId: '',
    selectedIds: [],
  },
};
