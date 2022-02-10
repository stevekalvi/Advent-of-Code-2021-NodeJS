import { readFile } from 'fs/promises'
const subTotalZ = [] // Sub total of the zero bits
const subTotalO = [] // Sub total of the one bits
const Gcb = [] // Greatest common bit
const Lcb = [] // Least common bit
let binaryString
let gamma = ''
let epsilon = ''

const foo = async () => {
  try {
    const options = { encoding: 'utf8' }
    const filename = './day3data.txt'
    const array = (await readFile(filename, options)).split('\r\n') // read file a split by line
    for (let i = 0; i < array.length; i++) {
      binaryString = array[i]
      if (i === 0) { // First time through initialize arrays of the string length
        for (let j = 0; j < binaryString.length; j++) {
          subTotalZ.push(0)
          subTotalO.push(0)
          Gcb.push(0)
          Lcb.push(0)
        }
      }
      for (let j = 0; j < binaryString.length; j++) {
        const strPosition = j
        const endPosition = j + 1
        const digit = binaryString.substring(strPosition, endPosition)
        switch (digit) {
          case '0':
            subTotalZ[j] += 1
            break
          case '1':
            subTotalO[j] += 1
            break
        }
      }
    }
    for (let i = 0; i < binaryString.length; i++) {
      switch (subTotalO[i] > subTotalZ[i]) {
        case true:
          Gcb[i] = '0'
          Lcb[i] = '1'
          break
        case false:
          Gcb[i] = '1'
          Lcb[i] = '0'
          break
      }
    }
    for (let i = 0; i < binaryString.length; i++) {
      gamma += Gcb[i]
      epsilon += Lcb[i]
    }
    const gammaR10 = parseInt(gamma, 2)
    const epsilonR10 = parseInt(epsilon, 2)
    const powerConsumption = gammaR10 * epsilonR10
    console.log('Gamma:', gammaR10)
    console.log('Epsilon:', epsilonR10)
    console.log('Power Consumption', powerConsumption)
  } catch (err) {
    console.error(err)
  }
}

foo()
