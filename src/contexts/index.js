
const injectRequired = description => ({
  description,
  required: false,
  isRequired: {
    description,
    required: true
  }
})

// peut-être inutile, à si on gère les tableaux de context
// ou si c'est au dev de créer un hanlder qui prends en entré le tableau et en sortie le context (unique)
export const ContextTypes = {
  single: injectRequired('single'),
  array: injectRequired('array')
}

