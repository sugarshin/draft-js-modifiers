import test from 'ava'
import { convertToRaw, ContentBlock } from 'draft-js'
import { Map, List } from 'immutable'
import createEditorState from './fixtures/createEditorState'
import omitBlockKeysFromRawContent from './fixtures/omitBlockKeysFromRawContent'

import modifyBlockByKey from '../src/modifyBlockByKey'

test('modifyBlockByKey', t => {
  const beforeRawContentState = {
    entityMap: {},
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
        text: '',
        type: 'header-one',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: { foo: 'bar' },
      },
    ],
  }

  const afterRawContentState = {
    entityMap: {},
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
        text: 'H1',
        type: 'header-one',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: { foo: 'buz' },
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

  const newEditorState = modifyBlockByKey(
    editorState,
    'item2',
    new ContentBlock({
      key: 'item2',
      text: 'H1',
      type: 'header-one',
      characterList: List(),
      depth: 0,
      data: Map({ foo: 'buz' }),
    })
  )
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
