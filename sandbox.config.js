const config = {
  showMenu: true,
  events: {
    mySessionParameter: [
      [
        32,
        0,
        ':akashic',
        {
          type: 'start',
          parameters: {
            mode: 'ranking',
            totalTimeLimit: 80,
            randomSeed: Math.random()
          }
        }
      ]
    ]
  }
}

// eslint-disable-next-line no-undef
module.exports = config
