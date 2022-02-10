import { readFileSync } from 'fs'

// Count the number of times a measure increases from the previous measurement

try {
  const options = { encoding: 'utf8' } // specify encoding
  const fileName = './day1data.txt'
  let increased = 0

  const array = readFileSync(fileName, options).toString().split('\n')
  for (let i = 0; i < array.length; i++) {
    switch (i) {
      case 0: {
        break
      }
      default: {
        const j = i - 1
        const measurement = array[i] - array[j]
        if (measurement > 0) {
          increased += 1
        }
        break
      }
    } // switch
  } // for

  console.log('The number of measurement increases is', increased)
} catch (err) {
  console.error(err)
}
