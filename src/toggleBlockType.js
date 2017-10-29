// @flow

import { RichUtils } from 'draft-js'

import type { EditorState } from 'draft-js'
import type { DraftBlockType } from 'draft-js/lib/DraftBlockType'

const toggleBlockType = (editorState: EditorState, blockType: DraftBlockType): EditorState => {
  return RichUtils.toggleBlockType(editorState, blockType)
}

export default toggleBlockType
