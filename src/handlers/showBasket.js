import { ContextTypes } from '../contexts'

const showBasket = ({ basket }) => {

  // ....
}

showBasket.inputTypes = {
  basket: ContextTypes.single.isRequired
}

showBasket.targetTypes = {
  booking: ContextTypes.single.isRequired
}

export default showBasket
