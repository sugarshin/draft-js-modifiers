// @flow

import insertNewBlock from './insertNewBlock'

import type { EditorState, DraftBlockType } from 'draft-js'

const insertEmptyBlock = (editorState: EditorState, blockType?: DraftBlockType = 'unstyled'): EditorState => {
  return insertNewBlock(editorState, blockType)
}

export default insertEmptyBlock
