import test from 'ava'
import fs from 'fs'
import path from 'path'
import * as Modifiers from '../src'

test('export all modules', t => {
  const files = fs.readdirSync(path.resolve(__dirname, '..', 'src'))
    .filter(name => /\.js$/.test(name) && name !== 'index.js')
    .map(name => name.replace(/\.js$/, ''))

  t.true(
    files.every(file => Object.keys(Modifiers).includes(file))
  )
})
