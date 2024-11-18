/*
 * @Description: 请补充模块描述
 *
 * @Author: Jin
 * @Date: 2024-11-14 17:53:12
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */

import { InnerEditor, registerInnerEditor } from '@leafer-in/editor';

@registerInnerEditor() // 1. 注册内部编辑器
export class ImageInnerEditor extends InnerEditor {
  public get tag() {
    return 'ImageInnerEditor';
  }
}
