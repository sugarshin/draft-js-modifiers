// @flow

import type { EditorState, ContentBlock } from 'draft-js'

const getCurrentBlock = (editorState: EditorState): ContentBlock => {
  const selection = editorState.getSelection()
  return editorState.getCurrentContent().getBlockForKey(selection.getStartKey())
}

export default getCurrentBlock
