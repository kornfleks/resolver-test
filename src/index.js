import askPrices from './handlers/askPrices'
import showBasket from './handlers/showBasket'
import showQRCode from './handlers/showQRCode'
import showScreeningList from './handlers/showScreeningList'
import movieConflict from './handlers/movieConflict'
import movieChooser from './handlers/movieChooser'
import authorConflict from './handlers/authorConflict'

import Resolver from './resolver/Resolver'

const resolver = new Resolver([
  askPrices,
  showBasket,
  showQRCode,
  showScreeningList,
  movieConflict,
  movieChooser,
  authorConflict
])

// on assume que l'action a déjà impacté le store
let state = {
  movieConflict: 'toto',
  authorConflict: 'James cameroune'
}
const action = {
  intent: 'showQRCode',
  movieConflict: 'toto',
  authorConflict: 'James cameroune'
}

state = resolver.resolve(state, action)
console.log('nextState', { ...state })
state = resolver.resolve(state, action)
console.log('nextState', { ...state })

/*
console.log('user intent', 'showQRCode')
console.log('contextState', state.context)
console.log('action', state.action)
console.log('tree', formatJSON(rootNode.toJSON()))

for (const leaf of rootNode.getLeafs()) {

  const leafRater = new LeafRater()
  console.log('leaf', formatJSON(leaf.toJSON()))
  console.log('leafRate', leafRater.rateNode(leaf))
}

for (const path of paths) {
  console.log('paths', path.getNodes().map(handler => handler.name))
}
*/