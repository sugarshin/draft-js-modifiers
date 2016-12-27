import test from 'ava'
import { convertToRaw } from 'draft-js'
import createEditorState from './fixtures/createEditorState'

import removeBlockStyle from '../src/removeBlockStyle'

test('removeBlockStyle', t => {
  const beforeRawContentState = {
    entityMap: {},
    blocks: [{
      key: 'item1',
      text: '',
      type: 'header-one',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    }],
  }

  const afterRawContentState = {
    entityMap: {},
    blocks: [{
      key: 'item1',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    }],
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

  const newEditorState = removeBlockStyle(editorState)
  t.not(newEditorState, editorState)
  t.deepEqual(
    convertToRaw(newEditorState.getCurrentContent()),
    afterRawContentState
  )
})
