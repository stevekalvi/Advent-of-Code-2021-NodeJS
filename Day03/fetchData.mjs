// Fetch the data from data file into an array
import { readFile } from 'fs/promises'

const fetchData = async (charset, dataFile) => {
  const options = { encoding: charset }
  const filename = dataFile
  return (await readFile(filename, options)).split('\n') // read file a split by line
}

export { fetchData }
