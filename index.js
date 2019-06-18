const matchesPath = path => change => change.path == path
const getVersion = change => change.version
const retrieveArchives = archive => version => archive.checkout(version)
const getFileAndParse = path => async archive => JSON.parse(await archive.readFile(path))

const hypertale = async (archive, path, callback) => {
  const history = await archive.history()
  
  const promises = history.filter(matchesPath(path))
        .map(getVersion)
        .map(retrieveArchives(archive))
        .map(getFileAndParse(path))
  
  const log = await Promise.all(promises)
  
  callback(log) 
}

export default hypertale
