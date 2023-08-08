export const extractIframeSrc = (htmlString?: string | null) => {
  if (!htmlString) return null

  const parser = new DOMParser()
  const htmlDoc = parser.parseFromString(htmlString, 'text/html')
  const iframeElement = htmlDoc.querySelector('iframe')
  return iframeElement ? iframeElement.getAttribute('src') : null
}

// Test the function
// const htmlString = '<iframe width="600" height="338" src="https://lookerstudio.google.com/embed/reporting/fd5dd756-3b65-4b11-8a9f-4c9a8a3ae607/page/76E4B" frameborder="0" style="border:0" allowfullscreen></iframe>';
// console.log(extractIframeSrc(htmlString)); // Outputs: "https://lookerstudio.google.com/embed/reporting/fd5dd756-3b65-4b11-8a9f-4c9a8a3ae607/page/76E4B"
