// @flow

import { AtomicBlockUtils } from 'draft-js'

import type { EditorState } from 'draft-js'

const insertAtomicBlock = (
  editorState: EditorState,
  entityType: string,
  mutability: 'IMMUTABLE' | 'MUTABLE' | 'SEGMENTED',
  data?: { [id: string]: any },
  character?: ?string = ' '
): EditorState => {
  const entityKey = editorState.getCurrentContent().createEntity(entityType, mutability, data).getLastCreatedEntityKey()
  return AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    character
  )
}

export default insertAtomicBlock
