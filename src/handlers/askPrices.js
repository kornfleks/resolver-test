import { ContextTypes } from '../contexts'

const askPrices = ({ screening }) => {

  // ....
}

askPrices.inputTypes = {
  // chaque clef indique le nom du context
  screening: ContextTypes.single.isRequired
}

askPrices.targetTypes = {
  basket: ContextTypes.single
}

export default askPrices
