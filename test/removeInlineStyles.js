import test from 'ava'
import { convertToRaw } from 'draft-js'
import createEditorState from './fixtures/createEditorState'

import removeInlineStyles from '../src/removeInlineStyles'

test('removeInlineStyles', t => {
  const beforeRawContentState = {
    entityMap: {},
    blocks: [{
      key: 'item1',
      text: 'asdfghjkl;',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [
        {
          length: 2,
          offset: 1,
          style: 'BOLD',
        },
        {
          length: 3,
          offset: 3,
          style: 'ITALIC',
        },
        {
          length: 5,
          offset: 0,
          style: 'UNDERLINE',
        },
      ],
      entityRanges: [],
      data: {},
    }],
  }

  const afterRawContentState = {
    entityMap: {},
    blocks: [{
      key: 'item1',
      text: 'asdfghjkl;',
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

  const newEditorState = removeInlineStyles(editorState, ['BOLD', 'ITALIC', 'UNDERLINE'])
  t.not(newEditorState, editorState)
  t.deepEqual(
    convertToRaw(newEditorState.getCurrentContent()),
    afterRawContentState
  )
})
