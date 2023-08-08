export const scrollToTop = (isSmooth?: boolean) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: isSmooth ? 'smooth' : 'auto',
  })
}
