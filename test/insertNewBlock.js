import test from 'ava'
import Draft from 'draft-js'
import createEditorState from './fixtures/createEditorState'
import omitBlockKeysFromRawContent from './fixtures/omitBlockKeysFromRawContent'

import insertNewBlock from '../src/insertNewBlock'

[
  [],
  ['header-one'],
  ['unstyled', 'Text'],
  ['blockquote', 'Quote text', { foo: 'bar' }],
].forEach(args => {
  test(`insertNewBlock ${args.length} args`, t => {
    const [type = 'unstyled', text = '', data = {}] = args
    const firstBlock = {
      key: 'item1',
      text: 'asdf',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [{
        length: 2,
        offset: 1,
        style: 'ITALIC',
      }],
      entityRanges: [],
      data: {},
    }
    const beforeRawContentState = {
      entityMap: {},
      blocks: [firstBlock],
    }
    const afterRawContentState = {
      entityMap: {},
      blocks: [firstBlock, {
        key: 'item2',
        text,
        type,
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data,
      }],
    }
    const editorState = createEditorState(
      beforeRawContentState,
      {
        anchorKey: 'item1',
        anchorOffset: 4,
        focusKey: 'item1',
        focusOffset: 4,
        isBackward: false,
        hasFocus: true,
      }
    )
    const newEditorState = insertNewBlock(editorState, ...args)

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
})
