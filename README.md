# Overview

This project allows Qodly Studio Devs to create their own components using the Standalone editor. and leveraging the pwer of the React library,
This document goal is to help developers learn about the API used to implement their first Qodly custom component

## Getting Started

### Prerequisites:

- [Node.js](https://nodejs.org/en/) >= 20
- npm >= 10

### Installing

```bash
npm i
```

### Running

```bash
npm run dev
```

### Generating a new component

In order to add a new component, you can simply run this command:

```bash
npm run generate:component
```

This will ask you to provide the name of the component and generate a new component in the `components` folder

## Introduction

The `components` folder is where the custom components live, to create your first component you have the freedom to implement it the way you like but we recomment using this component structure

```
   - components
      - ExampleComponent
         - ExampleComponent.build.tsx
         - ExampleComponent.render.tsx
         - ExampleComponent.settings.tsx
         - ExampleComponent.config.tsx
         - index.tsx
```

Now let's break this structure down, let's start by the `build` and `render` files:

- `ExampleComponent.build.tsx`: is the component used during the development of the user's webform when the Edit mode is _Enabled_

- `ExampleComponent.render.tsx`: is the component used during the rendering of the user's webform when the Edit mode is _Disabled_

- `ExampleComponent.settings.tsx` is the file containing the settings for the component it's an array of objects the contains the structure of the properties components to customize the component during build mode, for style properties, `Datasources` or even simple properties like changing the a Button component's label

- `ExampleComponent.config.tsx` is the file containing the general information for the component i.e Display Name, Component's icon, supported events, default props and so on.

### API

#### `useEnhancedNode`

A Hook that provides methods and state information related to the corresponding Node that manages the current component.

```javascript
const { connectors, setProp, ...collected } = useNode(collector);
```

#### Parameters

`collector`(node: Node) => Collected

A function that collects relevant state information from the corresponding Node. The component will re-render when the values returned by this function changes.

#### Returns

- Object
  - `id` NodeId
    The corresponding Node's id
  - `related` boolean
    Identifies if the component is being used as related component
  - `inNodeContext` boolean
    This is useful if you are designing a User Component that you also wish to be used as an ordinary React Component; this property helps to differentiate whether the component is being used as a User Component or not
  - `connectors` Object
    - `connect` (dom: HTMLElement) => HTMLElement
      Specifies the DOM that represents the User Component
    - `drag` (dom: HTMLElement) => HTMLElement
      Specifies the DOM that should be draggable
  - `actions` Object
    - `setProp` (props: Object, throttleRate?: number) => void
      Manipulate the current component's props. Additionally, specify a throttleRate to throttle the changes recoded in history for undo/redo
    - `setCustom` (custom: Object, throttleRate?: number) => void
      Manipulate the current component's custom properties. Additionally, specify a throttleRate to throttle the changes recoded in history for undo/redo
    - `setHidden` (bool: boolean) => void
      Hide/unhide the current component
    - `..collected` Collected
      The collected values returned from the collector

#### Example

Collecting state information

```tsx
import cn from 'classnames';
import { useEnhancedNode } from '@ws-ui/webform-editor';
import { FC } from 'react';

const Example: FC<ExampleProps> = () => {
  const { isHovered, amIBeingDragged } = useEnhancedNode((node) => ({
    isHovered: node.events.hovered,
    amIBeingDragged: node.events.drag,
  }));

  return (
    <div
      className={cn({
        hovering: isHovered,
        dragged: amIBeingDragged,
      })}
    >
      Hello World
    </div>
  );
};
```

#### Connecting the component to be used within the editor

To make the Editor recognize the component you need to connect it through the connect function, Connector must receive a HTML element which can be obtained via an element's `ref`.

```tsx
import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC } from 'react';
import { IExampleProps } from './Example.config';

const Example: FC<IExampleProps> = ({ text = '', style, classNames = [] }) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  return (
    <div ref={connect} style={style} className={cn(classNames)}>
      {text}
    </div>
  );
};

export default Example;
```

### DataSources

#### hooks

##### `useSources`

A Hook that provides state information related to the datasouces bound with the current component.

#### Returns

- Object
  - `sources` Object
    - `datasource` datasources.DataSource
      - `addListener` (method) datasources.DataSource.addListener(eventType: string, callback: Function): void
      - `removeListener` (method) datasources.DataSource.addListener(eventType: string, callback: Function): void
      - `getValue` (method) datasources.DataSource.getValue<string>(property?: string | number | undefined, settings?: any): Promise<string>
      - `setValue` (method) datasources.DataSource.setValue<T = any>(property: string | null, value: T, doFireEvent?: boolean | undefined): Promise<void>
    - `currentElement` datasources.DataSource

#### Example

```tsx
import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { IIframeProps } from './Iframe.config';

const Iframe: FC<IIframeProps> = ({
  url = '',
  style,
  className = 'h-80 aspect-video',
  classNames = [],
}) => {
  const { connect } = useRenderer();
  const [value, setValue] = useState(() => url);
  const {
    sources: { datasource: ds },
  } = useSources();

  useEffect(() => {
    if (!ds) return;

    const listener = async (/* event */) => {
      const v = await ds.getValue<string>();
      setValue(v || url);
    };

    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
  }, [ds]);

  return (
    <iframe
      ref={connect}
      style={style}
      className={cn(className, classNames)}
      src={value}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default Iframe;
```
