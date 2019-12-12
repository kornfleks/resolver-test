import { ContextTypes } from '../contexts'

const movieConflict = ({ movieConflict, author }) => {

  return {
    movie: `${movieConflict} de ${author}`
  }
}

movieConflict.inputTypes = {
  movieConflict: ContextTypes.single.isRequired,
  author: ContextTypes.single
}

movieConflict.targetTypes = {
  movies: ContextTypes.single
}

export default movieConflict
