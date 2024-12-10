# Leafer-react
A React components library based on leafer-ui
[中文](./README.md)

## Setup
You should install the package first
```
npm install leafer-react
```

## Get Started
Use it like react component
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

## More Examples
View component exampltes in useing storybook, you should clone the project from github first [leafer-react](https://github.com/Dolashink/leafer-react)

Into the project directory

```
cd leafer-react
```
Install the package
```
pnpm install
```
And execute the following command
```
pnpm run storybook
```

## More features are coming🚧...

For more information, see the [leafer-react](https://github.com/Dolashink/leafer-react).
