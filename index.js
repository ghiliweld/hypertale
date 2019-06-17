const hypertale = async (archive, path, callback) => {
  const history = await archive.history()
  
  const promises = history.filter(change => change.path == path)             // changes at desired path
        .map(change => change.version)                                  // version of changes
        .map(version => archive.checkout(version))                      // old archives
        .map(async archive => JSON.parse(await archive.readFile(path))) // get data of old archives at path
  
  const log = await Promise.all(promises)
  
  callback(log) 
}

export default hypertale
