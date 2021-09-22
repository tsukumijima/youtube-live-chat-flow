import { Message } from '~/models'
import { getImageSourceAsync } from '~/utils/dom-helper'

const getBackgroundColor = (el: HTMLElement) => {
  return getComputedStyle(el).backgroundColor
}

const parseCommonElements = async (el: HTMLElement) => {
  const author = el.querySelector('#author-name')?.textContent ?? undefined
  const authorType = el.getAttribute('author-type') ?? undefined
  const avatorImage = el.querySelector('#img') as HTMLImageElement | null
  const avatarUrl =
    (avatorImage && (await getImageSourceAsync(avatorImage))) ?? undefined
  const message = el.querySelector('#message')?.textContent ?? undefined

  return { message, author, authorType, avatarUrl }
}

const parseTextMessage = async (el: HTMLElement) => {
  const params = await parseCommonElements(el)

  const html = el.querySelector('#message')?.innerHTML

  return {
    ...params,
    html,
    messageType: 'text-message',
  }
}

const parsePaidMessage = async (el: HTMLElement) => {
  const params = await parseCommonElements(el)

  const html = el.querySelector('#message')?.innerHTML
  const subText = el.querySelector('#purchase-amount')?.textContent ?? undefined
  const card = el.querySelector('#card > #header') as HTMLElement | null
  const backgroundColor = (card && getBackgroundColor(card)) ?? undefined

  return {
    ...params,
    html,
    backgroundColor,
    subText,
    messageType: 'paid-message',
  }
}

const parsePaidSticker = async (el: HTMLElement) => {
  const params = await parseCommonElements(el)

  const subText = el.querySelector('#purchase-amount-chip')?.textContent ?? ''
  const card = el.querySelector('#card') as HTMLElement | null
  const backgroundColor = (card && getBackgroundColor(card)) ?? undefined
  const stickerImage = el.querySelector(
    '#sticker > #img'
  ) as HTMLImageElement | null
  const stickerUrl =
    (stickerImage && (await getImageSourceAsync(stickerImage))) ?? undefined

  return {
    ...params,
    stickerUrl,
    backgroundColor,
    subText,
    messageType: 'paid-sticker',
  }
}

const parseMembershipItem = async (el: HTMLElement) => {
  const params = await parseCommonElements(el)

  let html = el.querySelector('#message')?.innerHTML
  let subText = undefined
  if (html) {
    // milestone chat
    subText = el.querySelector('#header-primary-text')?.textContent ?? undefined
  } else {
    html = el.querySelector('#header-subtext')?.textContent ?? undefined
  }
  const card = el.querySelector('#card > #header') as HTMLElement | null
  const backgroundColor = (card && getBackgroundColor(card)) ?? undefined

  return {
    ...params,
    html,
    backgroundColor,
    subText,
    messageType: 'membership-item',
  }
}

export const parse = async (el: HTMLElement): Promise<Message | undefined> => {
  const tagName = el.tagName.toLowerCase()
  switch (tagName) {
    case 'yt-live-chat-text-message-renderer':
      return await parseTextMessage(el)
    case 'yt-live-chat-paid-message-renderer':
      return await parsePaidMessage(el)
    case 'yt-live-chat-paid-sticker-renderer':
      return await parsePaidSticker(el)
    case 'yt-live-chat-membership-item-renderer':
      return await parseMembershipItem(el)
  }
}
