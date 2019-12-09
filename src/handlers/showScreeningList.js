import { ContextTypes } from '../contexts'

const showScreeningList = ({ movie, data, screening }) => {

  // ....
}

showScreeningList.inputTypes = {
  movie: ContextTypes.single,
  date: ContextTypes.single,
  screening: ContextTypes.single
}

showScreeningList.targetTypes = {
  screening: ContextTypes.single
}

export default showScreeningList
