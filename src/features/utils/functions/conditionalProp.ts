export const conditionalProp = <T>(condition: boolean, property: keyof T, value: unknown) => {
  if (!condition) return {}
  return { [property]: value }
}
