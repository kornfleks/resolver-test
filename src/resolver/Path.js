
export default class Path {

  nodes = [] // array of handler

  constructor(...nodes) {
    this.nodes = nodes
  }

  isNodeIn = node => !!this.nodes.find(item => item === node)

  getLastNode = () => this.nodes[this.nodes.length - 1]

  getNodes = () => this.nodes

  add = node => this.nodes.push(node)

  copy = () => new Path(...this.nodes)

}