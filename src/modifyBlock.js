// @flow

import { EditorState } from 'draft-js'
import modifyBlockForContentState from 'draft-js/lib/modifyBlockForContentState'

import type { ContentBlock } from 'draft-js'

const modifyBlock = (editorState: EditorState, blockData: ContentBlock): EditorState => {
  const content = editorState.getCurrentContent()
  const selection = editorState.getSelection()
  const newContent = modifyBlockForContentState(content, selection, block => block.merge(blockData))

  return EditorState.push(
    editorState,
    newContent,
    'split-block' // TODO: will this do ?
  )
}

export default modifyBlock
