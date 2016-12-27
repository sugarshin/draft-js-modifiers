// @flow

import { EditorState, Modifier } from 'draft-js'

const insertText = (editorState: EditorState, text: string, entity?: ?string = null): EditorState => {
  const selection = editorState.getSelection()
  const content = editorState.getCurrentContent()
  const newContent = Modifier[selection.isCollapsed() ? 'insertText' : 'replaceText'](
    content,
    selection,
    text,
    editorState.getCurrentInlineStyle(),
    entity
  )

  return EditorState.push(
    editorState,
    newContent,
    'insert-fragment'
  )
}

export default insertText
