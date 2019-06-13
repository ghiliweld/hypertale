const hypertale = async (archive, path) => {
  const history = await archive.history()
  
  const log = history.filter(change => change.path == path)
        .map(change => change.version)                                  // version of changes
        .map(version => archive.checkout(version))                      // old archives
        .map(async archive => JSON.parse(await archive.readFile(path))) // get data of old archives at path
  
  const tale = await Promise.all(log)
  return tale
  
}

export default hypertale
