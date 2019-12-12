

// vérifie qu'un handler a au moins un targetTypes
export const hasSomeTargetTypes = (targetTypes, handler) => {
  const handlerTargetTypes = handler.targetTypes
  return Object.keys(targetTypes)
    .find((contextKey) => handlerTargetTypes[contextKey] != null, true)
}

export const getMissingRequiredInputTypes = (state, handler) => {
  const missingInputTypes = {}
  const { inputTypes } = handler
  for (const contextKey in inputTypes) {
    const inputType = inputTypes[contextKey]
    if (!inputType.required) { // on ne check que les input required
      continue;
    }
    const isMissing = state.context[contextKey] == null // null or undefined
    if (isMissing) {
      missingInputTypes[contextKey] = inputType
    }
  }
  return missingInputTypes
}