import Color from 'color'

// e.g. https://yt3.ggpht.com/-TusVtXdhftI/AAAAAAAAAAI/AAAAAAAAAAA/OCgsPx8gmAk/s32-c-k-no-mo-rj-c0xffffff/photo.jpg
const resizeAvatarUrl = (url: string, size: number) => {
  return url.replace(/(\/s)\d+([^/]+\/photo\.jpg)$/, `$1${Math.ceil(size)}$2`)
}

// e.g. https://yt3.ggpht.com/8ucCFoLkjQ9pVsfaKuFnHqIQqFjSr7Bht0dVuptyntxe-t6uej1BfH_vTk-cn1nsZdXjkjqipg=w24-h24-c-k-nd
const resizeEmojiUrl = (url: string, size: number) => {
  return url.replace(
    /(=w)\d+(-h)\d+([^=]+)$/,
    `$1${Math.ceil(size)}$2${Math.ceil(size)}$3`
  )
}

// e.g. https://lh3.googleusercontent.com/kgcJnLI6rRPD1Jm7xko7FNnl0k9qVFGzNvu8TmtTcAs4vHwigbTfa0N7N98r1TfqUPfHfRRln47UiRbeCr3Z=s40-rp
const resizeStickerUrl = (url: string, size: number) => {
  return url.replace(/(=s)\d+([^=]+)$/, `$1${Math.ceil(size)}$2`)
}

const fixContainedImageHeight = (element: Element, height: number) => {
  const children = element.childNodes
  if (!children) {
    return
  }

  Array.from(children).map((node) => {
    if (node instanceof HTMLImageElement) {
      node.src = resizeEmojiUrl(node.src, height)
      node.style.height = `${height}px`
      node.style.verticalAlign = 'bottom'
      return node
    }
    if (node instanceof HTMLElement) {
      fixContainedImageHeight(node, height)
    }
    return node
  })
}

const getOutlineStyle = (
  fontColor: string,
  height: number,
  outlineRatio: number
) => {
  if (!outlineRatio) {
    return ''
  }
  const n = (height * outlineRatio).toFixed(2)
  const c = Color(fontColor).darken(0.6).hex()
  return `
          text-shadow:
            -${n}px -${n}px 0 ${c},
            ${n}px -${n}px 0 ${c},
            -${n}px ${n}px 0 ${c},
            ${n}px ${n}px 0 ${c},
            0 ${n}px 0 ${c},
            0 -${n}px 0 ${c},
            ${n}px 0 0 ${c},
            -${n}px 0 0 ${c};
        `
}

const renderAvatar = (url: string, height: number) => {
  const el = document.createElement('img')
  el.src = resizeAvatarUrl(url, height)
  el.style.height = `${height}px`
  el.style.borderRadius = '50%'
  el.style.objectFit = 'cover'
  return el
}

const renderAuthor = (author: string, height: number) => {
  const textHeight = height * 0.8
  const padding = height * 0.1
  const el = document.createElement('span')
  el.style.fontSize = `${textHeight * 0.9}px`
  el.style.lineHeight = `${textHeight}px`
  el.style.paddingTop = `${padding}px`
  el.style.paddingBottom = `${padding}px`
  el.style.minWidth = '0'
  el.style.overflow = 'hidden'
  el.style.textOverflow = 'ellipsis'
  el.style.maxWidth = '100%'
  el.textContent = author
  return el
}

const renderMessage = (html: string, height: number) => {
  const el = document.createElement('span')
  el.style.minWidth = '0'
  el.style.overflow = 'hidden'
  el.style.textOverflow = 'ellipsis'
  el.style.maxWidth = '100%'
  el.innerHTML = html
  fixContainedImageHeight(el, height)
  return el
}

const renderStickerImage = (url: string, height: number) => {
  const el = document.createElement('img')
  el.src = resizeStickerUrl(url, height)
  el.style.height = `${height}px`
  return el
}

const renderOneLineMessage = ({
  html,
  author,
  subText,
  avatarUrl,
  fontColor,
  fontStyle,
  backgroundColor,
  height,
  width,
}: {
  html?: string
  author?: string
  subText?: string
  avatarUrl?: string
  fontColor?: string
  fontStyle?: string
  backgroundColor?: string
  height: number
  width: number
}) => {
  const el = document.createElement('div')
  el.style.color = fontColor ?? 'white'
  el.style.fontSize = `${height * 0.8 * 0.9}px`
  el.style.lineHeight = `${height * 0.8}px`
  el.style.padding = `${height * 0.1}px ${height * 0.2}px`
  el.style.backgroundColor = backgroundColor ?? 'transparent'
  el.style.borderRadius = `${height * 0.1}px`
  el.style.maxWidth = width > 0 ? `${width}%` : 'unset'
  el.setAttribute('style', el.getAttribute('style') + (fontStyle ?? ''))

  if (avatarUrl) {
    const avatar = renderAvatar(avatarUrl, height * 0.8)
    avatar.style.marginRight = `${height * 0.2}px`
    el.append(avatar)
  }

  if (author || subText) {
    const a = renderAuthor(
      (author ?? '') + (author && subText ? ' - ' : '') + (subText ?? ''),
      height * 0.8
    )
    el.append(a)

    const colon = document.createElement('span')
    colon.style.marginRight = `${height * 0.2}px`
    colon.textContent = ':'
    el.append(colon)
  }

  el.append(renderMessage(html ?? '', height * 0.8))
  return el
}

const renderTwoLineMessage = ({
  html,
  author,
  subText,
  avatarUrl,
  fontColor,
  fontStyle,
  backgroundColor,
  height,
  width,
}: {
  html?: string
  author?: string
  subText?: string
  avatarUrl?: string
  fontColor?: string
  fontStyle?: string
  backgroundColor?: string
  height: number
  width: number
}) => {
  const el = document.createElement('div')
  el.style.color = fontColor ?? 'white'
  el.style.fontSize = `${height * 0.8 * 0.9}px`
  el.style.lineHeight = `${height * 0.8}px`
  el.style.padding = `${height * 0.1}px ${height * 0.2}px`
  el.style.alignItems = 'start'
  el.style.backgroundColor = backgroundColor ?? 'transparent'
  el.style.borderRadius = `${height * 0.1}px`
  el.style.maxWidth = width > 0 ? `${width}%` : 'unset'
  el.setAttribute('style', el.getAttribute('style') + (fontStyle ?? ''))

  if (avatarUrl) {
    const avatar = renderAvatar(avatarUrl, height * 0.8)
    avatar.style.marginRight = `${height * 0.2}px`
    el.append(avatar)
  }

  const wrapper = document.createElement('div')
  wrapper.style.display = 'flex'
  wrapper.style.flexDirection = 'column'
  wrapper.style.alignItems = 'start'
  wrapper.style.minWidth = '0'
  wrapper.append(
    renderAuthor(
      (author ?? '') + (subText ? ` - ${subText}` : ''),
      height * 0.8
    )
  )
  if (html) {
    const message = renderMessage(html ?? '', height * 0.8)
    message.style.marginTop = `${height * 0.1}px`
    wrapper.append(message)
  }
  el.append(wrapper)
  return el
}

const renderSticker = ({
  stickerUrl,
  author,
  subText,
  avatarUrl,
  fontColor,
  fontStyle,
  backgroundColor,
  height,
}: {
  stickerUrl?: string
  author?: string
  subText?: string
  avatarUrl?: string
  fontColor?: string
  fontStyle?: string
  backgroundColor?: string
  height: number
}) => {
  const el = document.createElement('div')
  el.style.color = fontColor ?? 'white'
  el.style.fontSize = `${height * 0.8 * 0.9}px`
  el.style.lineHeight = `${height * 0.8}px`
  el.style.padding = `${height * 0.1}px ${height * 0.2}px`
  el.style.alignItems = 'start'
  el.style.backgroundColor = backgroundColor ?? 'transparent'
  el.style.borderRadius = `${height * 0.1}px`
  el.setAttribute('style', el.getAttribute('style') + (fontStyle ?? ''))

  if (avatarUrl) {
    const avatar = renderAvatar(avatarUrl, height * 0.8)
    avatar.style.marginRight = `${height * 0.2}px`
    el.append(avatar)
  }

  const wrapper = document.createElement('div')
  wrapper.style.display = 'flex'
  wrapper.style.flexDirection = 'column'
  wrapper.style.alignItems = 'start'
  wrapper.append(renderAuthor(author ?? '', height * 0.8))
  const message = renderAuthor(subText ?? '', height * 0.8)
  message.style.marginTop = `${height * 0.1}px`
  wrapper.append(message)
  el.append(wrapper)

  if (stickerUrl) {
    const sticker = renderStickerImage(stickerUrl, height * 1.7)
    sticker.style.marginLeft = `${height * 0.2}px`
    el.append(sticker)
  }

  return el
}

export type Template = 'one-line-message' | 'two-line-message' | 'sticker'

type Params = {
  html?: string
  author?: string
  subText?: string
  avatarUrl?: string
  stickerUrl?: string
  fontColor?: string
  fontStyle?: string
  backgroundColor?: string
  height: number
  width: number
  outlineRatio: number
}

export const render = (
  template: Template,
  params: Params
): HTMLElement | undefined => {
  const newParams = {
    ...params,
    fontStyle:
      params.fontStyle +
      getOutlineStyle(
        params.fontColor ?? 'white',
        params.height,
        params.outlineRatio
      ),
  }
  switch (template) {
    case 'one-line-message':
      return renderOneLineMessage(newParams)
    case 'two-line-message':
      return renderTwoLineMessage(newParams)
    case 'sticker':
      return renderSticker(newParams)
  }
}
