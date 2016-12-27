import test from 'ava'
import { EditorState, ContentState, SelectionState, ContentBlock } from 'draft-js'

import mergeEntityData from '../src/mergeEntityData'

let editorState
let entityKey

test.beforeEach(() => {
  const content = ContentState.createFromBlockArray([new ContentBlock({ key: 'item1', text: ' ' })])
  const selection = new SelectionState({
    anchorKey: 'item1',
    anchorOffset: 0,
    focusKey: 'item1',
    focusOffset: 1,
    isBackward: false,
    hasFocus: true,
  })
  editorState = EditorState.forceSelection(
    EditorState.createWithContent(content),
    selection
  )
  const newContent = editorState.getCurrentContent().createEntity('LINK', 'IMMUTABLE', {})
  entityKey = newContent.getLastCreatedEntityKey()
  editorState = EditorState.createWithContent(newContent)
})

test('mergeEntityData Add', t => {
  const newEditorState = mergeEntityData(editorState, entityKey, { foo: 1 })
  t.is(newEditorState.getCurrentContent().getEntity(entityKey).getData().foo, 1)
})

test('mergeEntityData Update', t => {
  let newEditorState = mergeEntityData(editorState, entityKey, { foo: 1 })
  newEditorState = mergeEntityData(newEditorState, entityKey, { foo: 2 })
  t.is(newEditorState.getCurrentContent().getEntity(entityKey).getData().foo, 2)
})

test('mergeEntityData Remove', t => {
  let newEditorState = mergeEntityData(editorState, entityKey, { foo: 1 })
  newEditorState = mergeEntityData(newEditorState, entityKey, { foo: void 0 })
  t.is(newEditorState.getCurrentContent().getEntity(entityKey).getData().foo, undefined)
})

test('mergeEntityData Merge', t => {
  let newEditorState = mergeEntityData(editorState, entityKey, { foo: 1 })
  newEditorState = mergeEntityData(newEditorState, entityKey, { bar: 2 })
  t.deepEqual(newEditorState.getCurrentContent().getEntity(entityKey).getData(), { foo: 1, bar: 2 })
})
