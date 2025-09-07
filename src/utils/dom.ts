/**
 * 图片加载错误处理
 */
export const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  if (img) {
    const parent = img.parentElement
    if (parent) {
      parent.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      parent.style.display = 'flex'
      parent.style.alignItems = 'center'
      parent.style.justifyContent = 'center'
      parent.style.color = 'white'
      parent.style.fontSize = '18px'
      parent.style.fontWeight = 'bold'
    }
    img.style.display = 'none'
  }
}

/**
 * 防止背景滚动
 */
export const preventBackgroundScroll = () => {
  document.body.style.overflow = 'hidden'
}

/**
 * 恢复背景滚动
 */
export const restoreBackgroundScroll = () => {
  document.body.style.overflow = 'auto'
}