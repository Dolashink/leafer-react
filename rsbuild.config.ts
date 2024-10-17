/*
 * @Description: 请补充模块描述
 * 
 * @Author: Jin
 * @Date: 2024-10-17 16:37:31
 * 
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  output: {
    distPath: {
      root: 'dist',
      js: 'js',
      css: 'css',
    },
    filename: {
      js: '[name].js',
      css: '[name].css',
    },
  },
  source: {
    entry: {
      index: './src/index.tsx',
    },
  },
  tools: {
    rspack: {
      output: {
        library: {
          type: 'es',
          name: 'leafer-react',
        },
      },
    },
  },
});
