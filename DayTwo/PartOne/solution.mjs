import { readFileSync } from 'fs'

try {
  const options = { encoding: 'utf8' } // specify encoding
  const fileName = './day2data.txt'
  let x = 0
  let y = 0

  const array = readFileSync(fileName, options).toString().split(/["\n"]/)
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i].replace('\r', '') // filter out the return char with a blank
    array[i] = array[i].split(' ') // split on a space
    const direction = array[i][0]
    const distance = array[i][1]
    switch (direction) {
      case 'forward':
        x += parseInt(distance)
        break
      case 'up':
        y += parseInt(distance)
        break
      case 'down':
        y -= parseInt(distance)
        break
    }
  }

  const totalDistance = x * -y
  console.log('total distance is', totalDistance)
} catch (err) {
  console.error(err)
}
