import test from 'ava'
import { convertToRaw } from 'draft-js'
import createEditorState from './fixtures/createEditorState'

import modifyBlock from '../src/modifyBlock'

test('modifyBlock', t => {
  const beforeRawContentState = {
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

  const afterRawContentState = {
    entityMap: {},
    blocks: [{
      key: 'item1',
      text: 'jkl;',
      type: 'header-one',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: { foo: 1 },
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

  const newEditorState = modifyBlock(editorState, { text: 'jkl;', type: 'header-one', data: { foo: 1 }})
  t.not(newEditorState, editorState)
  t.deepEqual(
    convertToRaw(newEditorState.getCurrentContent()),
    afterRawContentState
  )
})
