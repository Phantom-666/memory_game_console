const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max)
}

const wait: (seconds: number) => Promise<void> = (seconds: number) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res()
    }, seconds * 1000)
  })

export { getRandomInt, wait }
