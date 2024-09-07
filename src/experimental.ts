import { showcase } from './showcase'
import { LiveOnAirScene } from '@yasshi2525/live-on-air'

export const experimental = () => {
  showcase((scene: LiveOnAirScene) => {
    for (const spot of scene.spots) {
      spot.view.touchable = true
      spot.view.onPointDown.add(() => {
        if (spot.status === 'target') {
          spot.unsetAsDestination()
        } else if (spot.status === 'enabled') {
          spot.setAsDestination()
        }
      })
    }
  })
}
