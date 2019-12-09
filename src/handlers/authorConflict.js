import { ContextTypes } from '../contexts'

const authorConflict = ({ authorConflict }) => {

  // ....
}

authorConflict.inputTypes = {
  authorConflict: ContextTypes.single.isRequired
}

authorConflict.targetTypes = {
  author: ContextTypes.single
}

export default authorConflict
