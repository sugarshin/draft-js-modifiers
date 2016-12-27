// @flow

import { RichUtils } from 'draft-js'

import type { EditorState } from 'draft-js'

const toggleBlockType = (editorState: EditorState, blockType: string): EditorState => {
  return RichUtils.toggleBlockType(editorState, blockType)
}

export default toggleBlockType
