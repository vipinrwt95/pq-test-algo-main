export async function downloadImage(url?: string, imageName?: string) {
  if (!url) return

  const a = document.createElement('a')
  a.href = await toDataURL(url)
  a.download = imageName || 'image.png'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function toDataURL(url: string) {
  return fetch(url, {
    mode: 'cors',
    headers: {
      Origin: window.location.origin,
    },
  })
    .then((response) => {
      return response.blob()
    })
    .then((blob) => {
      return URL.createObjectURL(blob)
    })
}
