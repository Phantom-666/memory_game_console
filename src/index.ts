import { Game } from "./Game"

const run = async () => {
  const game = new Game()

  await game.startGame()
}

run()
