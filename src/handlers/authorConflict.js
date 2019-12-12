import { ContextTypes } from '../contexts'

const authorConflict = ({ authorConflict }) => {

  return {
    author: authorConflict
  }
}

authorConflict.inputTypes = {
  authorConflict: ContextTypes.single.isRequired
}

authorConflict.targetTypes = {
  author: ContextTypes.single
}

export default authorConflict
