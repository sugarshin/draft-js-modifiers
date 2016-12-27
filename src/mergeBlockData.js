// @flow

import { EditorState, Modifier } from 'draft-js'
import { Map } from 'immutable'

const mergeBlockData = (editorState: EditorState, data: { [id: string]: any }): EditorState => {
  const content = editorState.getCurrentContent()
  const selection = editorState.getSelection()
  const newContent = Modifier.mergeBlockData(content, selection, Map(data))
  return EditorState.push(editorState, newContent, 'change-block-data')
}

export default mergeBlockData
