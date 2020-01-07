import Color from 'color'
import Message from '~/models/message'
import { getImageSourceAsync } from './dom-helper'

const getBackgroundColor = (el: HTMLElement, opacity: number) => {
  const backgroundColor = getComputedStyle(el).backgroundColor
  const o = new Color(backgroundColor).object()
  return `rgba(${o.r}, ${o.g}, ${o.b}, ${opacity})`
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
    messageType: 'text-message'
  }
}

const parsePaidMessage = async (el: HTMLElement) => {
  const params = await parseCommonElements(el)

  const html = el.querySelector('#message')?.innerHTML
  const purchaseAmount =
    el.querySelector('#purchase-amount')?.textContent ?? undefined
  const card = el.querySelector('#card > #header') as HTMLElement | null
  const backgroundColor = (card && getBackgroundColor(card, 0.8)) ?? undefined

  return {
    ...params,
    html,
    backgroundColor,
    purchaseAmount,
    messageType: 'paid-message'
  }
}

const parsePaidSticker = async (el: HTMLElement) => {
  const params = await parseCommonElements(el)

  const purchaseAmount =
    el.querySelector('#purchase-amount-chip')?.textContent ?? ''
  const card = el.querySelector('#card') as HTMLElement | null
  const backgroundColor = (card && getBackgroundColor(card, 0.8)) ?? undefined
  const stickerImage = el.querySelector(
    '#sticker > #img'
  ) as HTMLImageElement | null
  const stickerUrl =
    (stickerImage && (await getImageSourceAsync(stickerImage))) ?? undefined

  return {
    ...params,
    stickerUrl,
    backgroundColor,
    purchaseAmount,
    messageType: 'paid-sticker'
  }
}

const parseMembershipItem = async (el: HTMLElement) => {
  const params = await parseCommonElements(el)

  const detailText =
    el.querySelector('#header-subtext')?.textContent ?? undefined
  const header = el.querySelector('#card > #header') as HTMLElement | null
  const backgroundColor =
    (header && getBackgroundColor(header, 0.8)) ?? undefined

  return {
    ...params,
    html: detailText,
    backgroundColor,
    messageType: 'membership-item'
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
