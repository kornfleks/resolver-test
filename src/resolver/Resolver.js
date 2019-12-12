import TreeFinder from './TreeFinder'
import LeafRater from './LeafRater'

const getBestLeaf = (leafs) => {
  const leafRates = leafs.map(leaf => {
    const leafRater = new LeafRater()
    const rate = leafRater.rateNode(leaf)
    return {
      leaf,
      rate
    }
  })
  const sortedLeafRates = leafRates.sort((a, b) => a.rate - b.rate)
  return sortedLeafRates[0].leaf
}

const getLeafNeededTargets = (leaf) => {
  const contextTargets = []
  const { parent } = leaf
  const { children, optionnalChildren } = parent
  for (const key in children) {
    if (children[key].includes(leaf)) {
      contextTargets.push(key)
    }
  }
  for (const key in optionnalChildren) { // à voire
    if (optionnalChildren[key].includes(leaf)) {
      contextTargets.push(key)
    }
  }
  return contextTargets
}

const hasObjectKeys = (o, keys) =>
  Object.keys(o).reduce((acc, key) => keys.includes(key) && acc, true)

const formatJSON = json => JSON.stringify(JSON.parse(json), null, 4)

export default class Resolver {

  handlers = null
  treeFinder = null
  goals = []

  constructor(handlers) {
    this.handlers = handlers
    this.treeFinder = new TreeFinder(handlers)
  }

  resolve = (state, action) => {
    this.goals.push(action.intent)
    const rootNode = this.treeFinder.resolve(state, action.intent)
    console.log('tree', formatJSON(rootNode.toJSON()))
    const leafs = rootNode.getLeafs()
    if (leafs.length === 0) {
      console.log('Désolé je n\'ai pas compris')
      return state
    }
    const leaf = getBestLeaf(leafs)
    console.log('leaf', formatJSON(leaf.toJSON()))
    const neededTargets = getLeafNeededTargets(leaf)
    const partialState = leaf.handler(state, action)
  
    if (hasObjectKeys(partialState, neededTargets)) {
      this.goals = this.goals.filter(goal => leaf.handler.name !== goal)
    }
    return {
      ...state,
      ...partialState
    }
  }

}