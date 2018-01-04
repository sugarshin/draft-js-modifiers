import test from 'ava'
import { convertToRaw } from 'draft-js'
import createEditorState from './fixtures/createEditorState'
import omitBlockKeysFromRawContent from './fixtures/omitBlockKeysFromRawContent'

import mergeBlockDataByKey from '../src/mergeBlockDataByKey'

test('mergeBlockDataByKey', t => {
  const beforeRawContentState = {
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
    ],
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
        data: { foo: 'bar' },
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

  const newEditorState = mergeBlockDataByKey(editorState, 'item2', { foo: 'bar' })
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
