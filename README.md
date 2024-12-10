# Leafer-react
A React components library based on leafer-ui

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


For more information, see the [github](https://github.com/Dolashink/leafer-react).
