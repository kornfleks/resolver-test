import Node from './Node'

const getMissingOptionnalInputTypes = (state, handler) => {
  const missingInputTypes = {}
  const { inputTypes } = handler
  for (const contextKey in inputTypes) {
    const inputType = inputTypes[contextKey]
    if (inputType.required) { // on ne check que les input required
      continue;
    }
    const isMissing = state[contextKey] == null // null or undefined
    if (isMissing) {
      missingInputTypes[contextKey] = inputType
    }
  }
  return missingInputTypes
}

const getResolvedContextNames = (handler, targets) => {
  const contextNames = []
  for (const contextName in targets) {
    if (handler.targetTypes[contextName] !== undefined) {
      contextNames.push(contextName)
    } 
  }
  return contextNames
}

const getMissingRequiredInputTypes = (state, handler) => {
  const missingInputTypes = {}
  const { inputTypes } = handler
  for (const contextKey in inputTypes) {
    const inputType = inputTypes[contextKey]
    if (!inputType.required) { // on ne check que les input required
      continue;
    }
    const isMissing = state[contextKey] == null // null or undefined
    if (isMissing) {
      missingInputTypes[contextKey] = inputType
    }
  }
  return missingInputTypes
}

export default class TreeFinder {

  handlers = []

  constructor(handlers) {
    this.handlers = handlers
  }

  enhanceNode = (node, state) => {
    const missingInputTypes = getMissingOptionnalInputTypes(state, node.handler)
    if (Object.keys(missingInputTypes).length === 0) {
      return;
    }
    
    for (const handler of this.handlers) {
      if (node.isHandlerInDirectLine(handler)) continue;
      const contextNames = getResolvedContextNames(handler, missingInputTypes)
      if (contextNames.length === 0) continue;
      const child = new Node(handler, node, {})
      const resolved = this.resolveNode(child, state)
      if (!resolved) continue;
      node.addChild(child, contextNames, true)
    }
  }

  resolveNode = (node, state) => {
    const missingInputTypes = getMissingRequiredInputTypes(state, node.handler)
    let missingInputNames = Object.keys(missingInputTypes)

    if (Object.keys(missingInputTypes).length === 0) {
      this.enhanceNode(node, state)
      return true
    }
    for (const handler of this.handlers) {
      if (node.isHandlerInDirectLine(handler)) continue;
      const contextNames = getResolvedContextNames(handler, missingInputTypes)
      if (contextNames.length === 0) continue;
      const child = new Node(handler, node, {})
      const resolved = this.resolveNode(child, state)
      if (!resolved) continue;
      node.addChild(child, contextNames)
      missingInputNames = missingInputNames.filter(contextName => !contextNames.includes(contextName))
    }

    return missingInputNames.length === 0
  }

  resolve = (state, intent) => {
    const targetHandler = this.handlers.find(handler => handler.name === intent)
    const rootNode = new Node(targetHandler, null, {})
    this.resolveNode(rootNode, state)
    return rootNode
  }

}