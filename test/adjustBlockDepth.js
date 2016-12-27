import test from 'ava'
import { convertToRaw } from 'draft-js'
import createEditorState from './fixtures/createEditorState'

import adjustBlockDepth from '../src/adjustBlockDepth'

const rawContentState = (type, ...depths) => ({
  entityMap: {},
  blocks: depths.map((depth, i) => ({
    key: `item${i}`,
    text: `test ${i}`,
    type,
    depth,
    inlineStyleRanges: [],
    entityRanges: [],
    data: {},
  })),
})
const selectionState = () => ({
  anchorKey: 'item1',
  anchorOffset: 0,
  focusKey: 'item1',
  focusOffset: 0,
  isBackward: false,
  hasFocus: true,
})

;[
  'unordered-list-item',
  'ordered-list-item',
  'checkable-list-item',
].forEach(type => {
  test(`adjustBlockDepth ${type}`, t => {
    const editorState = createEditorState(
      rawContentState(type, 0, 0),
      selectionState()
    )
    const newEditorState = adjustBlockDepth(editorState, 1, 4)
    t.not(newEditorState, editorState)
    t.deepEqual(
      convertToRaw(newEditorState.getCurrentContent()),
      rawContentState(type, 0, 1)
    )
  })
})
