import test from 'ava'
import Draft from 'draft-js'
import createEditorState from './fixtures/createEditorState'
import omitBlockKeysFromRawContent from './fixtures/omitBlockKeysFromRawContent'

import insertText from '../src/insertText'

test('insertText', t => {
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

  const newEditorState = insertText(editorState, 'jkl;')

  t.not(newEditorState, editorState)
  t.deepEqual(
    omitBlockKeysFromRawContent(
      Draft.convertToRaw(newEditorState.getCurrentContent())
    ),
    omitBlockKeysFromRawContent(
      afterRawContentState
    )
  )
})
