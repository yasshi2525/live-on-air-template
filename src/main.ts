import { GameMainParameterObject } from './parameterObject'
import { experimental } from './experimental'

export const main = (param: GameMainParameterObject) => {
  g.game.vars.gameState = { score: 0 }
  g.game.random = param.random

  experimental()
}
