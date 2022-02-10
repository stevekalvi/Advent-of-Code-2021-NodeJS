// import { readFile } from 'fs/promises'
import { fetchData } from './fetchData.mjs'

// Anonymous asynchronous function
(async () => {
  const Mcv = [] // Most common value
  const Lcv = [] // Least common value
  let Ogr = '' // Oxygen Generator Rating
  let Co2 = '' // Co2 Scrubber rating
  let zeroSubset
  let oneSubset
  let mcvSubset // Most common value subset
  let lcvSubset // Least common vl
  let remaining
  // A common value and a common value subset:
  // Least common value: Lcv, Least common value subset lcvSubset
  // Most common value: Mcv, Most common value subset lcvSubset
  const commonValue = async (array, Acv, acvSubset, acvLen, what) => {
    try {
      for (let i = 0; i < acvLen; i++) {
        switch (i) {
          case 0:
            zeroSubset = array.filter(array => array.substring(i, i + 1) === '0') // 0's in first bit
            oneSubset = array.filter(array => array.substring(i, i + 1) === '1') // 1's in first bit
            break
          default:
            zeroSubset = acvSubset.filter(acvSubset => acvSubset.substring(i, i + 1) === '0') // 0's in first bit
            oneSubset = acvSubset.filter(acvSubset => acvSubset.substring(i, i + 1) === '1') // 1's in first bit
            remaining = acvSubset.length
        }
        switch (remaining === 1) { // Only one Common Value Subset array entry remaining
          case true:
            switch (true) {
              case (zeroSubset.length === 1):
                Acv.push('0')
                continue
              case (oneSubset.length === 1):
                Acv.push('1')
                continue
              default:
            }
            break
          default: // More than one Common Value Subset array entry remaining
            switch (what) {
              case 'Mcv' : {
                switch (true) {
                  case (zeroSubset.length > oneSubset.length):
                    Acv.push('0') // Corresponding Mcv bit
                    acvSubset = zeroSubset
                    break
                  default:
                    Acv.push('1')
                    acvSubset = oneSubset
                }
                break
              }
              case 'Lcv': {
                switch (true) {
                  case (zeroSubset.length > oneSubset.length):
                    Acv.push('1') // Corresponding Lcv bit
                    acvSubset = oneSubset
                    break
                  default:
                    Acv.push('0')
                    acvSubset = zeroSubset
                }
                break
              }
            }
        }
      }
    } catch (err) {
      console.log('Error in A Common Value (Acv)', err)
    }
  }
  // Main
  try {
    const array = await (fetchData('utf8', './day3data.txt'))
    const len = array[0].length
    commonValue(array, Mcv, mcvSubset, len, 'Mcv') // First Pass - Most Common Value
    commonValue(array, Lcv, lcvSubset, len, 'Lcv') // Second Pass - Least Common Value
    for (let i = 0; i < len; i++) {
      Ogr += Mcv[i]
      Co2 += Lcv[i]
    }
    console.log('Binary output is:', Ogr, Co2)
    const OgrR10 = parseInt(Ogr, 2)
    const Co2R10 = parseInt(Co2, 2)
    const LifeSupportRating = OgrR10 * Co2R10
    console.log('Oxygen Generator Rating:', OgrR10)
    console.log('CO2 Scrubber Rating:', Co2R10)
    console.log('Life Support Rating', LifeSupportRating)
  } catch (err) {
    console.error(err)
  }
}

)()
