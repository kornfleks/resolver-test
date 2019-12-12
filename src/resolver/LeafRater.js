

export default class LeafRater {

  contexts = []

  rateChildren = (children) => {
    let rate = 0
    for (const contextName in children) {
      if (this.contexts.includes(contextName)) continue
      const contextChildren = children[contextName]
      const contextRates = []
      for (const child of contextChildren) {
        let childRate = 0
        childRate += this.rateChildren(child.children)
        childRate += this.rateChildren(child.optionnalChildren)
        contextRates.push(childRate)
      }
      const bestRate = Math.min(...contextRates) || 0
      rate += bestRate
    }
    return rate
  }

  rateNode = (node, weight = 0) => {
    let nodeWeight = weight + 1
    const { parent, handler, children, optionnalChildren } = node
    const nodeContexts = Object.keys(handler)
    this.contexts = nodeContexts.reduce((acc, context) => acc.includes(context) ? [...acc] : [...acc, context], this.contexts)
    nodeWeight += this.rateChildren(children)
    nodeWeight += this.rateChildren(optionnalChildren)
    if (!parent) return nodeWeight
    nodeWeight = this.rateNode(parent, nodeWeight)
    return nodeWeight
  }

}