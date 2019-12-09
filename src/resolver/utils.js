

// vérifie qu'un handler a au moins un targetTypes
export const hasSomeTargetTypes = (targetTypes, handler) => {
  const handlerTargetTypes = handler.targetTypes
  return Object.keys(targetTypes)
    .find((contextKey) => handlerTargetTypes[contextKey] != null, true)
}
