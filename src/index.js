import askPrices from './handlers/askPrices'
import showBasket from './handlers/showBasket'
import showQRCode from './handlers/showQRCode'
import showScreeningList from './handlers/showScreeningList'
import movieConflict from './handlers/movieConflict'
import movieChooser from './handlers/movieChooser'
import authorConflict from './handlers/authorConflict'

import PathsFinder from './resolver/PathsFinder'

const pathsFinder = new PathsFinder([
  askPrices,
  showBasket,
  showQRCode,
  showScreeningList,
  movieConflict,
  movieChooser,
  authorConflict
])

// on assume que l'action a déjà impacté le store
const state = {
  context: {
    movieConflict: 'toto',
    authorConflict: 'James cameroune'
  },
  action: {
    intent: 'showQRCode',
    movieConflict: 'toto',
    authorConflict: 'James cameroune'
  }
}

const paths = pathsFinder.findPaths(state)

console.log('user intent', 'showQRCode')
console.log('contextState', state.context)
console.log('action', state.action)
for (const path of paths) {
  console.log('paths', path.getNodes().map(handler => handler.name))
}
