// @flow

import { RichUtils } from 'draft-js'

import type { EditorState } from 'draft-js'

const toggleEntity = (editorState: EditorState, entityKey: ?string): EditorState => {
  return RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey)
}

export default toggleEntity
