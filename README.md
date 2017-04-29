# draft-js-modifiers

[![CircleCI][circleci-image]][circleci-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![npm version][npm-image]][npm-url]
[![License][license-image]][license-url]

Modular state modifiers for [Draft.js](https://draftjs.org/)

```bash
yarn add draft-js-modifiers

# or

npm i draft-js-modifiers
```

## Usage

```js
import * as Modifiers from 'draft-js-modifiers'

const newEditorState = Modifiers.mergeBlockData(currentEditorState, { foo: 1 })
```

### Moduler importing

```js
import adjustBlockDepth from 'draft-js-modifiers/adjustBlockDepth'

// Support Tree Shaking for webpack, rollup.js
import { insertText } from 'draft-js-modifiers'
```

## Methods

### `adjustBlockDepth`

```js
adjustBlockDepth(editorState: EditorState, adjustment: number, maxDepth: number)
```

### `insertAtomicBlock`

```js
insertAtomicBlock(
  editorState: EditorState,
  entityType: string,
  mutability: 'IMMUTABLE' | 'MUTABLE' | 'SEGMENTED',
  data?: { [id: string]: any },
  character?: ?string = ' '
)
```

### `insertEmptyBlock`

```js
insertEmptyBlock(editorState: EditorState, blockType?: DraftBlockType = 'unstyled')
```

### `insertNewBlock`

```js
insertNewBlock(
  editorState: EditorState,
  blockType?: DraftBlockType = 'unstyled',
  text?: string = '',
  data?: { [id: string]: any } = {}
)
```

### `insertText`

```js
insertText(editorState: EditorState, text: string, entity?: ?string = null)
```

### `mergeBlockData`

```js
mergeBlockData(editorState: EditorState, data: { [id: string]: any })
```

### `mergeBlockDataByKey`

```js
mergeBlockDataByKey(editorState: EditorState, blockKey: string, data: { [id: string]: any })
```

### `mergeEntityData`

```js
mergeEntityData(editorState: EditorState, entityKey: string, data: { [id: string]: any })
```

### `modifyBlock`

```js
modifyBlock(editorState: EditorState, blockData: ContentBlock)
```

### `modifyBlockByKey`

```js
modifyBlockByKey(editorState: EditorState, blockKey: string, blockData: ContentBlock)
```

### `removeBlockStyle`

```js
removeBlockStyle(editorState: EditorState)
```

### `removeInlineStyles`

```js
removeInlineStyles(editorState: EditorState, inlineStyles: Array<string> = [])
```

### `resetBlock`

```js
resetBlock(editorState: EditorState, block: ContentBlock)
```

### `toggleBlockType`

```js
toggleBlockType(editorState: EditorState, blockType: string)
```

### `toggleEntity`

```js
toggleEntity(editorState: EditorState, entityKey: ?string)
```

### `toggleInlineStyle`

```js
toggleInlineStyle(editorState: EditorState, inlineStyle: string)
```

## How to add module

```bash
yarn run add -- moduleName

# or

npm run add -- moduleName
```

## License

[MIT][license-url]

© sugarshin

[circleci-image]: https://circleci.com/gh/sugarshin/draft-js-modifiers/tree/master.svg?style=svg&circle-token=f80707ebb99977ec63649c41cb76202f05aa75e1
[circleci-url]: https://circleci.com/gh/sugarshin/draft-js-modifiers/tree/master
[coveralls-image]: https://coveralls.io/repos/github/sugarshin/draft-js-modifiers/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/sugarshin/draft-js-modifiers?branch=master
[npm-image]: https://img.shields.io/npm/v/draft-js-modifiers.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/draft-js-modifiers
[license-image]: https://img.shields.io/:license-mit-blue.svg?style=flat-square
[license-url]: https://sugarshin.mit-license.org/
