import { readFile } from 'fs/promises'

const foo = async () => {
  try {
    const options = { encoding: 'utf8' } // specify encoding
    const fileName = './day2data.txt'
    let horizontal = 0
    let aim = 0
    let depth = 0

    const array = (await readFile(fileName, options)).split('\r\n')
    for (let i = 0; i < array.length; i++) {
      array[i] = array[i].split(' ') // split on a space
      const distance = parseInt(array[i].pop())
      const direction = array[i].pop()
      switch (direction) {
        case 'forward':
          horizontal += distance
          depth += distance * aim
          break
        case 'up':
          aim -= distance
          break
        case 'down':
          aim += distance
          break
      }
    }

    console.log('part 2 horizontal distance by depth', horizontal * depth)
  } catch (err) {
    console.error(err)
  }
}

foo()
