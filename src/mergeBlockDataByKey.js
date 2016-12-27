// @flow

import { EditorState } from 'draft-js'

const mergeBlockDataByKey = (editorState: EditorState, blockKey: string, data: { [id: string]: any }): EditorState => {
  const content = editorState.getCurrentContent()
  const updatedBlock = content.getBlockForKey(blockKey).mergeIn(['data'], data)
  const blockMap = content.getBlockMap().merge({ [blockKey]: updatedBlock })
  return EditorState.push(editorState, content.merge({ blockMap }), 'change-block-data')
}

export default mergeBlockDataByKey
