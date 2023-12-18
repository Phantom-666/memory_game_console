import readline from "readline/promises"
import { getRandomInt, wait } from "./utils"
import { words } from "./config"

class Game {
  private gameType = -1
  constructor() {}

  private askInput = async (input: string) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    const num = await rl.question(input)

    rl.close()

    return num
  }

  private generateNumbers = (count: number, level: number) => {
    const result = []

    for (let i = 0; i < count; ++i) {
      const num = getRandomInt(level * 2)

      result.push(num)
    }

    return result
  }

  private waitAndDisplay = async () => {
    console.log()

    for (let i = 0; i < 3; ++i) {
      console.log(`${i + 1}...`)

      await wait(1)
    }
  }
  private clearConsole = () => {
    process.stdout.write("\u001b[2J\u001b[0;0H")
  }

  private numbersGame = async (maxLevels = 5) => {
    console.log("Numbers game is starting")

    let diffLevel = 1
    let maxLength = 1
    let currentLevel = 0

    while (currentLevel < maxLevels) {
      let lose = false

      console.log(`Level : ${currentLevel + 1}/${maxLevels}`)

      const numbers = this.generateNumbers(maxLength, diffLevel)

      // console.log(numbers)

      let current = ""

      for (let i = 0; i < numbers.length; ++i) {
        current += numbers[i]

        console.log(`sequence : ${current}`)

        await this.waitAndDisplay()
        this.clearConsole()

        const sequence = await this.askInput("what the sequence : ")

        if (sequence === current) {
          console.log()
          console.log("Nice! Next level")
          console.log()

          maxLength += 1
          diffLevel += 1
        } else {
          lose = true

          break
        }
      }

      if (lose) break

      currentLevel += 1
    }

    console.log("Game over")
    console.log()
    console.log(`Your score \nMax level : ${currentLevel}`)
  }

  private getRandomWords = (maxLength: number) => {
    const result = []

    for (let i = 0; i < maxLength; ++i) {
      const randomIndex = getRandomInt(words.length)
      const randomWord = words[randomIndex]

      result.push(randomWord)
    }

    return result
  }

  private wordsGame = async (maxLevels = 3) => {
    console.log("Words game is starting")

    let maxLength = 1
    let currentLevel = 0

    while (currentLevel < maxLevels) {
      let lose = false

      console.log(`Level : ${currentLevel + 1}/${maxLevels}`)

      const ws = this.getRandomWords(maxLength)

      console.log(ws)

      let current = ""

      for (let i = 0; i < ws.length; ++i) {
        current += ws[i]

        console.log(`sequence : ${current}`)

        await this.waitAndDisplay()
        this.clearConsole()

        const sequence = await this.askInput("what the sequence : ")

        if (sequence === current) {
          console.log()
          console.log("Nice! Next level")
          console.log()

          maxLength += 1
          current += " "
        } else {
          lose = true

          break
        }
      }

      if (lose) break

      currentLevel += 1
    }

    console.log("Game over")
    console.log()
    console.log(`Your score \nMax level : ${currentLevel}`)
  }

  public startGame = async () => {
    // TODO: Number or word
    // TODO: Add difficulties

    this.gameType = Number(
      await this.askInput("What type of game\n1.Numbers\n2.Words\n")
    )

    if (this.gameType === 1) {
      await this.numbersGame()
    } else if (this.gameType === 2) {
      await this.wordsGame()
    } else {
      throw new Error("Not valid")
    }
  }
}

export { Game }
