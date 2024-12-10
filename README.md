# Leafer-react组件库
基于leafer-ui的React组件库
[English](./README.en.md)

## 前置
先安装leafer-react依赖包
```
npm install leafer-react
```

## 开始
我们可以像使用其他react组件库一样使用它
```javascript
import { LeaferApp, Frame, Rect } from 'leafer-react';

function MyLeaferApp () {
    return (
        <LeaferApp>
            <Frame fill="#f5f5f5">
                <Rect width={375} height={667} fill="red" />
            </Frame>
        </LeaferApp>
    )
}

export MyLeaferApp;
```

## 更多示例
查看基于Storybook的组件示例，您首先应该从 GitHub 上克隆该项目 [leafer-react](https://github.com/Dolashink/leafer-react)

进入项目目录

```
cd leafer-react
```
安装所需依赖包
```
pnpm install
```
执行以下命令，启动storybook
```
pnpm run storybook
```

### 更多功能施工中🚧...
关于其它信息，请参阅 [leafer-react](https://github.com/Dolashink/leafer-react).
