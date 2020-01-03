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

const buildAvatar = (url: string, height: number) => {
  const el = document.createElement('img')
  el.src = url
  el.style.height = `${height}px`
  el.style.borderRadius = '50%'
  el.style.objectFit = 'cover'
  return el
}

const buildAuthor = (author: string, height: number) => {
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

const buildMessage = (html: string, height: number) => {
  const el = document.createElement('span')
  el.innerHTML = html
  fixContainedImageHeight(el, height)
  return el
}

const buildStickerImage = (url: string, height: number) => {
  const el = document.createElement('img')
  el.src = url
  el.style.height = `${height}px`
  return el
}

const buildOneLineMessage = ({
  html,
  avatarUrl,
  fontColor,
  fontStyle,
  height
}: {
  html?: string
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
    const avatar = buildAvatar(avatarUrl, height * 0.8)
    avatar.style.marginRight = `${height * 0.2}px`
    el.append(avatar)
  }

  el.append(buildMessage(html ?? '', height * 0.8))
  return el
}

const buildTwoLineMessage = ({
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
    const avatar = buildAvatar(avatarUrl, height * 0.8)
    avatar.style.marginRight = `${height * 0.2}px`
    el.append(avatar)
  }

  const wrapper = document.createElement('div')
  wrapper.style.display = 'flex'
  wrapper.style.flexDirection = 'column'
  wrapper.style.alignItems = 'start'
  wrapper.append(buildAuthor(author ?? '', height * 0.8))
  const message = buildMessage(html ?? '', height * 0.8)
  message.style.marginTop = `${height * 0.1}px`
  wrapper.append(message)

  el.append(wrapper)
  return el
}

const buildCardMessage = ({
  html,
  author,
  avatarUrl,
  fontColor,
  fontStyle,
  backgroundColor,
  height
}: {
  html?: string
  author?: string
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
    const avatar = buildAvatar(avatarUrl, height * 0.8)
    avatar.style.marginRight = `${height * 0.2}px`
    container.append(avatar)
  }

  const wrapper = document.createElement('div')
  wrapper.style.display = 'flex'
  wrapper.style.flexDirection = 'column'
  wrapper.style.alignItems = 'start'
  wrapper.append(buildAuthor(author ?? '', height * 0.8))
  if (html) {
    const message = buildMessage(html, height * 0.8)
    message.style.marginTop = `${height * 0.1}px`
    wrapper.append(message)
  }
  container.append(wrapper)
  return el
}

const buildSticker = ({
  stickerUrl,
  author,
  avatarUrl,
  fontColor,
  fontStyle,
  backgroundColor,
  height
}: {
  stickerUrl?: string
  author?: string
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
    const avatar = buildAvatar(avatarUrl, height * 0.8)
    avatar.style.marginRight = `${height * 0.2}px`
    container.append(avatar)
  }

  const wrapper = document.createElement('div')
  wrapper.style.display = 'flex'
  wrapper.style.flexDirection = 'column'
  wrapper.style.alignItems = 'start'
  wrapper.append(buildAuthor(author ?? '', height * 0.8))
  if (stickerUrl) {
    const sticker = buildStickerImage(stickerUrl, height * 1.9)
    sticker.style.marginTop = `${height * 0.1}px`
    wrapper.append(sticker)
  }
  container.append(wrapper)
  return el
}

type Style =
  | 'one-line-message'
  | 'two-line-message'
  | 'card-message'
  | 'sticker'

type Params = {
  html?: string
  author?: string
  avatarUrl?: string
  stickerUrl?: string
  fontColor?: string
  fontStyle?: string
  backgroundColor?: string
  height: number
}

export const build = (
  style: Style,
  params: Params
): HTMLElement | undefined => {
  switch (style) {
    case 'one-line-message':
      return buildOneLineMessage(params)
    case 'two-line-message':
      return buildTwoLineMessage(params)
    case 'card-message':
      return buildCardMessage(params)
    case 'sticker':
      return buildSticker(params)
  }
}
