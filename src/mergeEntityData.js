// @flow

import { EditorState } from 'draft-js'

const mergeEntityData = (editorState: EditorState, entityKey: string, data: Object): EditorState => {
  const newContentState = editorState.getCurrentContent().mergeEntityData(entityKey, data)
  return EditorState.push(editorState, newContentState, 'apply-entity')
}

export default mergeEntityData
