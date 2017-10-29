// @flow

import { AtomicBlockUtils } from 'draft-js'

import type { EditorState } from 'draft-js'
import type { DraftEntityType } from 'draft-js/lib/DraftEntityType'

const insertAtomicBlock = (
  editorState: EditorState,
  entityType: DraftEntityType,
  mutability: 'IMMUTABLE' | 'MUTABLE' | 'SEGMENTED',
  data?: { [id: string]: any },
  character?: string = ' '
): EditorState => {
  const entityKey = editorState.getCurrentContent().createEntity(entityType, mutability, data).getLastCreatedEntityKey()
  return AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    character
  )
}

export default insertAtomicBlock
