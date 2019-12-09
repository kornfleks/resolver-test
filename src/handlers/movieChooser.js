import { ContextTypes } from '../contexts'

const movieChooser = ({ movies }) => {

  // ....
}

movieChooser.inputTypes = {
  movies: ContextTypes.single.isRequired
}

movieChooser.targetTypes = {
  movie: ContextTypes.single
}

export default movieChooser
