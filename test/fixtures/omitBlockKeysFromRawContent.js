const omitBlockKeysFromRawContent = content => {
  const ret = Object.assign({}, content)
  ret.blocks.forEach(block => {
    delete block.key
  })
  return ret
}

export default omitBlockKeysFromRawContent
