// @flow

import { EditorState, ContentState, CharacterMetadata, Modifier } from 'draft-js'
import getCurrentBlock from './utils/getCurrentBlock'

const removeInlineStyles = (editorState: EditorState, inlineStyles: Array<string> = []): EditorState => {
  const selection = editorState.getSelection()
  const content = editorState.getCurrentContent()
  let newContent

  if (selection.isCollapsed()) {
    const block = getCurrentBlock(editorState)
    const updatedCharacterList = block.getCharacterList().map(c => {
      return inlineStyles.reduce((characterMetadata: CharacterMetadata, style: string): CharacterMetadata => {
        return CharacterMetadata.removeStyle(characterMetadata, style)
      }, c)
    })
    const updatedBlock = block.set('characterList', updatedCharacterList)
    newContent = content.merge({ blockMap: content.getBlockMap().merge({ [block.getKey()]: updatedBlock }) })
  } else {
    newContent = inlineStyles.reduce((contentState: ContentState, style: string): ContentState => {
      return Modifier.removeInlineStyle(contentState, selection, style)
    }, content)
  }

  return EditorState.push(editorState, newContent, 'change-inline-style')
}

export default removeInlineStyles
