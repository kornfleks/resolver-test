import Path from "./Path"
import { hasSomeTargetTypes } from './utils'

const getMissingRequiredInputTypes = (state, handler) => {
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

const getMissingOptionnalInputTypes = (state, handler) => {
  const missingInputTypes = {}
  const { inputTypes } = handler
  for (const contextKey in inputTypes) {
    const inputType = inputTypes[contextKey]
    if (inputType.required) { // on ne check que les input required
      continue;
    }
    const isMissing = state.context[contextKey] || state.action[contextKey] == null // null or undefined
    if (isMissing) {
      missingInputTypes[contextKey] = inputType
    }
  }
  return missingInputTypes
}

export default class PathsFinder {

  handlers = []

  constructor(handlers) {
    this.handlers = handlers
  }

  resolve = (path, state) => {
    const resolvedPaths = []
    const enhancedResolvedPaths = []
    const handler = path.getLastNode()
    const missingInputTypes = getMissingRequiredInputTypes(state, handler)
    // il ne manque aucun input required
    if (Object.keys(missingInputTypes).length === 0) {
      return [path]
    }
    for (const handler of this.handlers) {
      // on zappe les handlers dans lequelle on est déjà passé
      if (path.isNodeIn(handler)) continue;
      if (hasSomeTargetTypes(missingInputTypes, handler)) {
        const nextPath = path.copy()
        nextPath.add(handler)
        const nextResolvedPaths = this.resolve(nextPath, state)
        if (nextResolvedPaths.length > 0) { // si a partir de ce chemin on réussi à trouver des chemins qui sont finissable
          resolvedPaths.push(...nextResolvedPaths)
        }
      }
    }
    for (const resolvedPath of resolvedPaths) {
      const enhancedPaths = this.enhance(resolvedPath, state)
      if (enhancedPaths.length === 0) { // si on a pas réussi a trouver des chemins amélioré on garde le chemin actuel
        enhancedResolvedPaths.push(resolvedPath)
      } else {
        enhancedResolvedPaths.push(...enhancedPaths)
      }
    }
    return enhancedResolvedPaths
  }

  enhance = (path, state) => {
    const resolvedPaths = []
    const handler = path.getLastNode()
    const missingInputTypes = getMissingOptionnalInputTypes(state, handler)
    // il ne manque aucun input required
    if (Object.keys(missingInputTypes).length === 0) {
      return [path]
    }
    for (const handler of this.handlers) {
      // on zappe les handlers dans lequelle on est déjà passé
      if (path.isNodeIn(handler)) continue;
      if (hasSomeTargetTypes(missingInputTypes, handler)) {
        const nextPath = path.copy()
        nextPath.add(handler)
        const nextResolvedPaths = this.resolve(nextPath, state)
        if (nextResolvedPaths.length > 0) { // si a partir de ce chemin on réussi à trouver des chemins qui sont finissable
          resolvedPaths.push(...nextResolvedPaths)
        }
      }
    }
    return resolvedPaths
  }

  findPaths = (state) => {
    const targetHandler = this.handlers.find(handler => handler.name === state.action.intent)
    const initialPath = new Path(targetHandler)

    const paths = this.resolve(initialPath, state)
    return paths
  }

}