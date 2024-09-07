import { LiveOnAirScene, LiveOnAirSceneBuilder } from '@yasshi2525/live-on-air'

export const showcase = (experimental?: (scene: LiveOnAirScene) => void) => {
  const field = { x: 100, y: 100, width: g.game.width - 200, height: g.game.height - 200 }
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
    scene.layer.field.append(scene.broadcaster.view)
    if (experimental) {
      experimental(scene)
    }
  })
  g.game.pushScene(scene)
}
