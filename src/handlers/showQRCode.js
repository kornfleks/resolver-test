import { ContextTypes } from '../contexts'

const showQRCode = ({ booking }) => {

  // ....
}

showQRCode.inputTypes = {
  booking: ContextTypes.single.isRequired
}

showQRCode.targetTypes = {}

export default showQRCode
