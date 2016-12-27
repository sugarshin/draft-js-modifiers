import Draft, { EditorState, SelectionState } from 'draft-js'

const createEditorState = (rawContentState, rawSelectionState) => {
  return EditorState.forceSelection(
    EditorState.createWithContent(
      Draft.convertFromRaw(rawContentState)
    ),
    new SelectionState(rawSelectionState)
  )
}

export default createEditorState
