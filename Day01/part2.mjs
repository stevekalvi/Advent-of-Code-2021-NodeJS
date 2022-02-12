import { readFileSync } from 'fs'

// Count the number of times a measure increases from the previous measurement
// How many measurements are larger that the previous measurement.

try {
  const options = { encoding: 'utf8' } // specify encoding
  const fileName = './day1data.txt'
  let increased = 0

  // We want to find the compare each three measurement sliding window.  It appears to be a non-contiguous three numbers followed by a blank slot.
  // This can also be done in an array using the fourth element as a separate sum array element, as shown by the dashes below.  We also have to stop when no we are no longer
  // able to create three measurement sums (< array.length)

  // 199  A
  // 200  A B
  // 208  A B C
  // 210  - B C D
  // 200  E - C D
  // 207  E F - D
  // 240  E F G -
  // 269  - F G H
  // 260    - G H
  // 263      - H

  const sumArray = []
  let col1Break = false
  let col2Break = false
  let col3Break = false
  let col4Break = false
  let array = readFileSync(fileName, options).toString().split('\n')
  array = array.map(Number)
  let col1 = 0 // set column indices to the corresponding sliding window offset
  let col2 = 1
  let col3 = 2
  let col4 = 3
  let measurement = 0
  for (let i = 0; i < array.length; i++) {
    col1Break = ((col1 + 1) % 4) === 0 // elements {0-3} with 3rd element containing the measurement 
    col2Break = (col2 % 4) === 0 // elements {1-4} with 4th element containing the measurement
    col3Break = ((col3 - 1) % 4) === 0 // elements {2-5} with 5th element containing the measurement
    col4Break = ((col4 - 2) % 4) === 0 // elements {3-6} with 6th element containing the measurement
    if (col1Break && (col1 <= array.length)) {
      measurement = array[col1 - 1] + array[col1 - 2] + array[col1 - 3]
      sumArray.push(measurement) // Append measurement to sumArray
    }
    if (col2Break && (col2 <= array.length)) {
      measurement = array[col2 - 1] + array[col2 - 2] + array[col2 - 3]
      sumArray.push(measurement) // Append measurement to sumArray
    }
    if (col3Break && (col3 <= array.length)) {
      measurement = array[col3 - 1] + array[col3 - 2] + array[col3 - 3]
      sumArray.push(measurement) // Append measurement to sumArray
    }
    if (col4Break && (col4 <= array.length)) {
      measurement = array[col4 - 1] + array[col4 - 2] + array[col4 - 3]
      sumArray.push(measurement) // Append measurement to sumArray
    }
    col1 += 1
    col2 += 1
    col3 += 1
    col4 += 1
  }

  // Check for increases in the measurements

  for (let i = 0; i < sumArray.length; i++) {
    switch (i) {
      case 0: {
        break
      }
      default: {
        const j = i - 1
        if (sumArray[i] > sumArray[j]) {
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
