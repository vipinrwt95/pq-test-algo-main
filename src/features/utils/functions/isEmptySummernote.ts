export const isEmptySummernote = (value: string) => {
  // remove all the p and br then if the length is 0, show error
  return value.replace(/(<p>)|(<br>|)(<\/p>)/g, '').trim().length === 0
}
