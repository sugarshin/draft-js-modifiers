// @flow

import { EditorState } from 'draft-js'

import type { ContentBlock } from 'draft-js'

const modifyBlockByKey = (editorState: EditorState, blockKey: string, blockData: ContentBlock): EditorState => {
  const content = editorState.getCurrentContent()
  const blockMap = content.getBlockMap().map(b => b.key === blockKey ? b.merge(blockData) : b)
  const newContent = content.merge({ blockMap })

  return EditorState.push(
    editorState,
    newContent,
    'split-block' // TODO: will this do ?
  )
}

export default modifyBlockByKey
