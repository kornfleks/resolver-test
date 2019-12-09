
export default class PathRate {
  
  uselessTargetCount = 0
  length = 0

  constructor(uselessTargetCount = 0, length = 0) {
    this.uselessTargetCount = uselessTargetCount
    this.length = length
  }

  incrementLength = () => this.length += 1

  addUselessTargetCount = count => this.uselessTargetCount += count

  copy = () => new PathRate(this.uselessTargetCount, this.length)

}
