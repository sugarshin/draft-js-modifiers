// @flow

import { EditorState, ContentBlock, CharacterMetadata, genKey } from 'draft-js'
import { Map, List, Repeat } from 'immutable'
import getCurrentBlock from './utils/getCurrentBlock'

import type { DraftBlockType } from 'draft-js'

const insertNewBlock = (
  editorState: EditorState,
  blockType: DraftBlockType = 'unstyled',
  text: string = '',
  data: Object = {}
): EditorState => {
  const content = editorState.getCurrentContent()
  const selection = editorState.getSelection()
  const currentBlock = getCurrentBlock(editorState)
  const emptyBlockKey = genKey()
  const emptyBlock = new ContentBlock({
    key: emptyBlockKey,
    type: blockType,
    text,
    characterList: List(Repeat(CharacterMetadata.create(), text.length)),
    data: Map().merge(data),
  })
  const blockMap = content.getBlockMap()
  const blocksBefore = blockMap.toSeq().takeUntil(value => value === currentBlock)
  const blocksAfter = blockMap.toSeq().skipUntil(value => value === currentBlock).rest()
  const augmentedBlocks = [
    [
      currentBlock.getKey(),
      currentBlock,
    ],
    [
      emptyBlockKey,
      emptyBlock,
    ],
  ]
  const newBlocks = blocksBefore.concat(augmentedBlocks, blocksAfter).toOrderedMap()
  const focusKey = emptyBlockKey
  const newContent = content.merge({
    blockMap: newBlocks,
    selectionBefore: selection,
    selectionAfter: selection.merge({
      anchorKey: focusKey,
      anchorOffset: 0,
      focusKey,
      focusOffset: 0,
      isBackward: false,
    }),
  })

  const newState = EditorState.push(
    editorState,
    newContent,
    'split-block'
  )
  return EditorState.forceSelection(newState, newContent.getSelectionAfter())
}

export default insertNewBlock
