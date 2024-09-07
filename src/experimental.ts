import { showcase } from './showcase'
import { Scene } from '@yasshi2525/live-on-air'

export const experimental = () => {
  showcase((scene: Scene) => {
    for (const spot of scene.spots) {
      spot.view.touchable = true
      spot.view.onPointDown.add(() => {
        if (spot.status === 'target') {
          spot.unsetAsDestination()
        } else if (spot.status === 'enabled' && scene.broadcaster.view.visible()) {
          spot.setAsDestination()
        }
      })
    }
  })
}
