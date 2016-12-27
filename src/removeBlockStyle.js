// @flow

import { EditorState, RichUtils } from 'draft-js'

const removeBlockStyle = (editorState: EditorState): EditorState => {
  const withoutBlockStyle = RichUtils.tryToRemoveBlockStyle(editorState)
  if (withoutBlockStyle) {
    return EditorState.push(
      editorState,
      withoutBlockStyle,
      'change-block-type'
    )
  }
  return editorState
}

export default removeBlockStyle
