import test from 'ava'
import { convertToRaw } from 'draft-js'
import createEditorState from './fixtures/createEditorState'

import resetBlock from '../src/resetBlock'

const blocks = () => [
  {
    key: 'item1',
    text: 'asdf',
    type: 'header-one',
    depth: 0,
    inlineStyleRanges: [],
    entityRanges: [],
    data: {},
  },
  {
    key: 'item2',
    text: 'fdsa',
    type: 'header-two',
    depth: 0,
    inlineStyleRanges: [],
    entityRanges: [],
    // TODO: test Entity
    // entityRanges: [{
    //   key: 0,
    //   length: 2,
    //   offset: 2
    // }],
    data: {},
  },
  {
    key: 'item3',
    text: 'jkl;',
    type: 'ordered-list-item',
    depth: 1,
    inlineStyleRanges: [{
      length: 4,
      offset: 0,
      style: 'ITALIC',
    }],
    entityRanges: [],
    data: { foo: 1 },
  },
]

const reset = block => Object.assign({}, block, {
  text: '',
  type: 'unstyled',
  depth: 0,
  inlineStyleRanges: [],
})

blocks().forEach(({ key }, i) => {
  const beforeRawContentState = {
    entityMap: {},
    blocks: blocks(),
  }
  const afterRawContentState = {
    entityMap: {},
    blocks: blocks().map(block => block.key === key ? reset(block) : block),
  }
  const editorState = createEditorState(
    beforeRawContentState,
    {
      anchorKey: 'item1',
      anchorOffset: 0,
      focusKey: 'item1',
      focusOffset: 0,
      isBackward: false,
      hasFocus: true,
    }
  )

  test(`resetBlock ${i}`, t => {
    const newEditorState = resetBlock(editorState, editorState.getCurrentContent().getBlockForKey(key))
    t.not(newEditorState, editorState)
    t.deepEqual(
      convertToRaw(newEditorState.getCurrentContent()),
      afterRawContentState
    )
  })
})
