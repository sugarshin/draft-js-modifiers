import test from 'ava'
import { convertToRaw } from 'draft-js'
import createEditorState from './fixtures/createEditorState'
import omitBlockKeysFromRawContent from './fixtures/omitBlockKeysFromRawContent'

import insertAtomicBlock from '../src/insertAtomicBlock'

test('insertAtomicBlock', t => {
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
    entityMap: {
      0: {
        data: {
          foo: 'bar',
        },
        mutability: 'IMMUTABLE',
        type: 'buz',
      },
    },
    blocks: [
      {
        key: 'item1',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: 'item2',
        text: ' ',
        type: 'atomic',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [{
          key: 0,
          length: 1,
          offset: 0,
        }],
        data: {},
      },
      {
        key: 'item3',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
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

  const newEditorState = insertAtomicBlock(editorState, 'buz', 'IMMUTABLE', { foo: 'bar' })
  t.not(newEditorState, editorState)
  t.deepEqual(
    omitBlockKeysFromRawContent(
      convertToRaw(newEditorState.getCurrentContent())
    ),
    omitBlockKeysFromRawContent(
      afterRawContentState
    )
  )
})
