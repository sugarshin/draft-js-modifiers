const fs = require('fs')
const path = require('path')
const n = process.argv[2]
if (!n) {
  throw new Error('should must be called with name. `npm run add -- someModule`')
}
const createFile = (name, dir, template) => {
  const file = path.resolve(__dirname, '..', dir, `${name}.js`)
  fs.writeFileSync(file, template.join('\n'))
  console.log(`Successfully ${dir}/${name}.js created.`)
}
const addToIndex = name => {
  const indexFilePath = path.resolve(__dirname, '..', 'src', 'index.js')
  const indexFile = fs.readFileSync(indexFilePath, { encoding: 'utf8' })
  fs.writeFileSync(indexFilePath, indexFile + [
    `export { default as ${name} } from './${name}'`,
    '',
  ].join('\n'))
  console.log(`Successfully src/${name}.js updated.`)
}

createFile(n, 'src', [
  '// @flow',
  '',
  'import { EditorState } from \'draft-js\'',
  '',
  `const ${n} = (`,
  '  editorState: EditorState',
  '): EditorState => {}',
  '',
  `export default ${n}`,
  '',
])

createFile(n, 'test', [
  'import test from \'ava\'',
  'import { convertToRaw } from \'draft-js\'',
  'import createEditorState from \'./fixtures/createEditorState\'',
  '',
  `import ${n} from '../src/${n}'`,
  '',
  `test.skip('${n}', () => {})`,
  '',
])

addToIndex(n)

console.log('Please add documentation to README.md')
