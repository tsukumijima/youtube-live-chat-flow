import Color from 'color'

const fixContainedImageHeight = (element: Element, height: number) => {
  const children = element.childNodes
  if (!children) {
    return
  }

  Array.from(children).map((node) => {
    if (node instanceof HTMLImageElement) {
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

const getOutlineStyle = (fontColor: string, height: number) => {
  const n = ((height * 0.8) / 48).toFixed(2)
  const c = Color(fontColor)
    .darken(0.6)
    .hex()
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
  el.src = url
  el.style.height = `${height}px`
  el.style.borderRadius = '50%'
  el.style.objectFit = 'cover'
  return el
}

const renderAuthor = (author: string, height: number) => {
  const textHeight = height * 0.8
  const padding = height * 0.1
  const el = document.createElement('span')
  el.style.fontSize = `${textHeight}px`
  el.style.lineHeight = `${textHeight}px`
  el.style.paddingTop = `${padding}px`
  el.style.paddingBottom = `${padding}px`
  el.textContent = author
  return el
}

const renderMessage = (html: string, height: number) => {
  const el = document.createElement('span')
  el.innerHTML = html
  fixContainedImageHeight(el, height)
  return el
}

const renderStickerImage = (url: string, height: number) => {
  const el = document.createElement('img')
  el.src = url
  el.style.height = `${height}px`
  return el
}

const renderOneLineMessage = ({
  html,
  author,
  avatarUrl,
  fontColor,
  fontStyle,
  height
}: {
  html?: string
  author?: string
  avatarUrl?: string
  fontColor?: string
  fontStyle?: string
  height: number
}) => {
  const el = document.createElement('div')
  el.style.color = fontColor ?? 'white'
  el.style.fontSize = `${height * 0.8}px`
  el.style.lineHeight = `${height * 0.8}px`
  el.style.padding = `${height * 0.1}px`
  el.setAttribute('style', el.getAttribute('style') + (fontStyle ?? ''))

  if (avatarUrl) {
    const avatar = renderAvatar(avatarUrl, height * 0.8)
    avatar.style.marginRight = `${height * 0.2}px`
    el.append(avatar)
  }

  if (author) {
    const a = renderAuthor(author + ':', height * 0.8)
    a.style.marginRight = `${height * 0.2}px`
    el.append(a)
  }

  el.append(renderMessage(html ?? '', height * 0.8))
  return el
}

const renderTwoLineMessage = ({
  html,
  author,
  avatarUrl,
  fontColor,
  fontStyle,
  height
}: {
  html?: string
  author?: string
  avatarUrl?: string
  fontColor?: string
  fontStyle?: string
  height: number
}) => {
  const el = document.createElement('div')
  el.style.color = fontColor ?? 'white'
  el.style.fontSize = `${height * 0.8}px`
  el.style.lineHeight = `${height * 0.8}px`
  el.style.padding = `${height * 0.1}px`
  el.style.alignItems = 'start'
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
  const message = renderMessage(html ?? '', height * 0.8)
  message.style.marginTop = `${height * 0.1}px`
  wrapper.append(message)

  el.append(wrapper)
  return el
}

const renderCardMessage = ({
  html,
  author,
  purchaseAmount,
  avatarUrl,
  fontColor,
  fontStyle,
  backgroundColor,
  height
}: {
  html?: string
  author?: string
  purchaseAmount?: string
  avatarUrl?: string
  fontColor?: string
  fontStyle?: string
  backgroundColor?: string
  height: number
}) => {
  const el = document.createElement('div')
  el.style.color = fontColor ?? 'white'
  el.style.fontSize = `${height * 0.8}px`
  el.style.lineHeight = `${height * 0.8}px`
  el.style.padding = `${height * 0.1}px`
  el.setAttribute('style', el.getAttribute('style') + (fontStyle ?? ''))

  const container = document.createElement('div')
  container.style.backgroundColor = backgroundColor ?? 'transparent'
  container.style.borderRadius = `${height * 0.1}px`
  container.style.padding = `${height * 0.2}px ${height * 0.4}px`
  container.style.alignItems = 'start'
  container.style.display = 'flex'
  container.style.verticalAlign = 'bottom'
  container.style.whiteSpace = 'nowrap'
  el.append(container)

  if (avatarUrl) {
    const avatar = renderAvatar(avatarUrl, height * 0.8)
    avatar.style.marginRight = `${height * 0.2}px`
    container.append(avatar)
  }

  const wrapper = document.createElement('div')
  wrapper.style.display = 'flex'
  wrapper.style.flexDirection = 'column'
  wrapper.style.alignItems = 'start'
  wrapper.append(
    renderAuthor(
      (author ?? '') + (purchaseAmount ? ` - ${purchaseAmount}` : ''),
      height * 0.8
    )
  )
  if (html) {
    const message = renderMessage(html, height * 0.8)
    message.style.marginTop = `${height * 0.1}px`
    wrapper.append(message)
  }
  container.append(wrapper)
  return el
}

const renderSticker = ({
  stickerUrl,
  author,
  purchaseAmount,
  avatarUrl,
  fontColor,
  fontStyle,
  backgroundColor,
  height
}: {
  stickerUrl?: string
  author?: string
  purchaseAmount?: string
  avatarUrl?: string
  fontColor?: string
  fontStyle?: string
  backgroundColor?: string
  height: number
}) => {
  const el = document.createElement('div')
  el.style.color = fontColor ?? 'white'
  el.style.fontSize = `${height * 0.8}px`
  el.style.lineHeight = `${height * 0.8}px`
  el.style.padding = `${height * 0.1}px`
  el.setAttribute('style', el.getAttribute('style') + (fontStyle ?? ''))

  const container = document.createElement('div')
  container.style.backgroundColor = backgroundColor ?? 'transparent'
  container.style.borderRadius = `${height * 0.1}px`
  container.style.padding = `${height * 0.2}px ${height * 0.4}px`
  container.style.alignItems = 'start'
  container.style.display = 'flex'
  container.style.verticalAlign = 'bottom'
  container.style.whiteSpace = 'nowrap'
  el.append(container)

  if (avatarUrl) {
    const avatar = renderAvatar(avatarUrl, height * 0.8)
    avatar.style.marginRight = `${height * 0.2}px`
    container.append(avatar)
  }

  const wrapper = document.createElement('div')
  wrapper.style.display = 'flex'
  wrapper.style.flexDirection = 'column'
  wrapper.style.alignItems = 'start'
  wrapper.append(
    renderAuthor(
      (author ?? '') + (purchaseAmount ? ` - ${purchaseAmount}` : ''),
      height * 0.8
    )
  )
  if (stickerUrl) {
    const sticker = renderStickerImage(stickerUrl, height * 1.9)
    sticker.style.marginTop = `${height * 0.1}px`
    wrapper.append(sticker)
  }
  container.append(wrapper)
  return el
}

export type Template =
  | 'one-line-message'
  | 'two-line-message'
  | 'card-message'
  | 'sticker'

type Params = {
  html?: string
  author?: string
  paymentAmount?: string
  avatarUrl?: string
  stickerUrl?: string
  fontColor?: string
  fontStyle?: string
  backgroundColor?: string
  height: number
}

export const render = (
  template: Template,
  params: Params
): HTMLElement | undefined => {
  const newParams = {
    ...params,
    fontStyle:
      params.fontStyle +
      getOutlineStyle(params.fontColor ?? 'white', params.height)
  }
  switch (template) {
    case 'one-line-message':
      return renderOneLineMessage(newParams)
    case 'two-line-message':
      return renderTwoLineMessage(newParams)
    case 'card-message':
      return renderCardMessage(newParams)
    case 'sticker':
      return renderSticker(newParams)
  }
}
