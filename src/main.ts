import { GameMainParameterObject } from './parameterObject'
import { experimental } from './experimental'

export const main = (param: GameMainParameterObject) => {
  g.game.vars.gameState = { score: 0 }
  g.game.random = param.random
  g.game.vars.gameState.score = Math.floor(g.game.random.generate() * 1000)

  experimental()
}
