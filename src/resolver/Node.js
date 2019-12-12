import { getMissingRequiredInputTypes } from './utils'

export default class Node {

  handler = null
  parent = null
  isLeaf = true
  children = {}
  optionnalChildren = {}

  constructor(handler, parent, children) {
    this.handler = handler
    this.parent = parent
    this.children = children
  }

  getHandler = () => this.handler

  addChild = (child, contextNames, optionnal = false) => {
    const children = optionnal ? this.optionnalChildren : this.children
    for (const contextName of contextNames) {
      const contextChildren = children[contextName] || []
      contextChildren.push(child)
      children[contextName] = contextChildren
    }
    if (child && contextNames.length > 0) {
      this.isLeaf = false
    }
  }

  isHandlerInDirectLine = handler => {
    if (handler === this.handler) return true
    if (!this.parent) return false
    return this.parent.isHandlerInDirectLine(handler)
  }

  getLeafs = () => {
    if (this.isLeaf) return [this] // c'est dégueux ^^
    let leafs = []
    for (const contextName in this.children) {
      const children = this.children[contextName]
      const childrenLeafs = children.reduce((acc, child) => [...acc, ...child.getLeafs()], [])
      leafs = [...leafs, ...childrenLeafs]
    }
    for (const contextName in this.optionnalChildren) {
      const children = this.optionnalChildren[contextName]
      const childrenLeafs = children.reduce((acc, child) => [...acc, ...child.getLeafs()], [])
      leafs = [...leafs, ...childrenLeafs]
    }
    return leafs
  }

  toJSON = () => `
  {
    "name": "${this.handler.name}",
    "children": {
      ${Object.keys(this.children)
        .map(contextName =>
          `"${contextName}": [${this.children[contextName].map(child => child.toJSON()).join(',')}]`
        )
        .join(',')}
    },
    "optionnalChildren": {
      ${Object.keys(this.optionnalChildren)
        .map(contextName =>
          `"${contextName}": [${this.optionnalChildren[contextName].map(child => child.toJSON()).join(',')}]`
        )
        .join(',')}
    }
  }
  `

}