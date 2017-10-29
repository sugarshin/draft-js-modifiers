// @flow

import insertNewBlock from './insertNewBlock'

import type { EditorState } from 'draft-js'
import type { DraftBlockType } from 'draft-js/lib/DraftBlockType'

const insertEmptyBlock = (editorState: EditorState, blockType?: DraftBlockType = 'unstyled'): EditorState => {
  return insertNewBlock(editorState, blockType)
}

export default insertEmptyBlock
