// @flow

import { EditorState, SelectionState, Modifier } from 'draft-js'

import type { ContentBlock } from 'draft-js'

/**
 * Remove range also change block type to 'unstyled'
 */
const resetBlock = (editorState: EditorState, block: ContentBlock): EditorState => {
  const content = editorState.getCurrentContent()
  const key = block.getKey()
  const targetRange = new SelectionState({
    anchorKey: key,
    anchorOffset: 0,
    focusKey: key,
    focusOffset: block.getLength(),
  })
  const withoutTargetContent = Modifier.removeRange(content, targetRange, 'backward')
  const resetBlock = Modifier.setBlockType(
    withoutTargetContent,
    withoutTargetContent.getSelectionAfter(),
    'unstyled'
  )
  const newState = EditorState.push(editorState, resetBlock, 'remove-range')
  return EditorState.forceSelection(newState, resetBlock.getSelectionAfter())
}

export default resetBlock
