import test from 'ava'
import Draft from 'draft-js'

import mergeBlockData from '../src/mergeBlockData'

let editorState
const KEY = 'item0'

test.beforeEach(() => {
  const content = Draft.ContentState.createFromBlockArray([new Draft.ContentBlock({ key: KEY })])
  editorState = Draft.EditorState.createWithContent(content)
})

test('mergeBlockData Add', t => {
  const newEditorState = mergeBlockData(editorState, { foo: 1 })
  const block = newEditorState.getCurrentContent().getBlockForKey(KEY)
  t.is(block.getData().get('foo'), 1)
})

test('mergeBlockData Update', t => {
  let newEditorState = mergeBlockData(editorState, { foo: 1 })
  newEditorState = mergeBlockData(newEditorState, { foo: 2 })
  const block = newEditorState.getCurrentContent().getBlockForKey(KEY)
  t.is(block.getData().get('foo'), 2)
})

test('mergeBlockData Remove', t => {
  let newEditorState = mergeBlockData(editorState, { foo: 1 })
  newEditorState = mergeBlockData(newEditorState, { foo: void 0 })
  const block = newEditorState.getCurrentContent().getBlockForKey(KEY)
  t.is(block.getData().get('foo'), undefined)
})

test('mergeBlockData Merge', t => {
  let newEditorState = mergeBlockData(editorState, { foo: 1 })
  newEditorState = mergeBlockData(newEditorState, { bar: 2 })
  const block = newEditorState.getCurrentContent().getBlockForKey(KEY)
  t.is(block.getData().get('foo'), 1)
  t.is(block.getData().get('bar'), 2)
})
