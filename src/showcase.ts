import { LiveContext, LiveGame, LiveOnAirScene, LiveOnAirSceneBuilder } from '@yasshi2525/live-on-air'

export const showcase = (experimental?: (scene: LiveOnAirScene) => void) => {
  const field = { x: 100, y: 100, width: g.game.width - 200, height: g.game.height - 200 }
  LiveOnAirSceneBuilder.getDefault(g.game).spot({
    liveClass: class extends LiveGame {
      readonly font = new g.DynamicFont({
        game: g.game,
        fontFamily: 'sans-serif',
        size: 50,
        strokeColor: 'white',
        strokeWidth: 4
      })

      protected evaluateScore (context: LiveContext): number {
        return (context.vars as Record<string, g.FilledRect>).gauge.width / context.view.width * 100
      }

      protected handleGamePlay (context : LiveContext): () => void {
        const { scene, view } = { ...context }
        const gauge = new g.FilledRect({
          scene,
          parent: view,
          width: 0,
          height: 100,
          cssColor: '#aa4444',
          y: view.height / 2,
          anchorY: 0.5
        })
        context.vars = { gauge }
        gauge.onUpdate.add(() => {
          gauge.width += view.width / 120
          if (gauge.width > view.width) {
            gauge.width = 0
          }
          gauge.modified()
        })
        return () => {
          gauge.destroy()
        }
      }

      protected handleIntroduction ({ scene, view }: LiveContext, next: () => void) {
        view.append(new g.FilledRect({
          scene,
          width: view.width,
          height: view.height,
          cssColor: '#ffffaa',
          opacity: 0.25
        }))
        const description = new g.Label({
          scene,
          parent: view,
          text: 'ゲージの最大値でボタンを押そう！',
          font: this.font
        })
        scene.setTimeout(() => next(), 3000)
        return () => {
          description.destroy()
        }
      }
    }
  })
  const sb = new LiveOnAirSceneBuilder(g.game)
    .layer({ field })
    .field({})
    .broadcaster({ x: field.width / 2, y: field.height / 2 })
    .spot({})
  for (let i = 0; i < 5; i++) {
    sb.spot({ x: g.game.random.generate() * (field.width - 100), y: g.game.random.generate() * (field.height - 100) })
  }
  const scene = sb.build()
  scene.onLoad.add(() => {
    scene.layer.field.insertBefore(
      new g.FilledRect({
        scene, width: field.width, height: field.height, cssColor: '#44aa22', opacity: 0.25
      }), scene.layer.field.children![0])
    if (experimental) {
      experimental(scene)
    }
  })
  g.game.pushScene(scene)
}
