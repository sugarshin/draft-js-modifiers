// @flow

import { EditorState } from 'draft-js'
import adjustBlockDepthForContentState from 'draft-js/lib/adjustBlockDepthForContentState'

const adjustBlockDepth = (
  editorState: EditorState,
  adjustment: number,
  maxDepth: number
): EditorState => {
  const content = adjustBlockDepthForContentState(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    adjustment,
    maxDepth
  )

  return EditorState.push(editorState, content, 'adjust-depth')
}

export default adjustBlockDepth
