// @flow

import { RichUtils } from 'draft-js'

import type { EditorState } from 'draft-js'

const toggleInlineStyle = (editorState: EditorState, inlineStyle: string): EditorState => {
  return RichUtils.toggleInlineStyle(editorState, inlineStyle)
}

export default toggleInlineStyle
