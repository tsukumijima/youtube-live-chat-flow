import Color from 'color'
import DOMHelper from './dom-helper'

const getBackgroundColor = (el: HTMLElement, opacity: number) => {
  const backgroundColor = getComputedStyle(el).backgroundColor
  const o = new Color(backgroundColor).object()
  return `rgba(${o.r}, ${o.g}, ${o.b}, ${opacity})`
}

const parseTextMessage = async (el: HTMLElement) => {
  const html = el.querySelector('#message')?.innerHTML
  const author = el.querySelector('#author-name')?.textContent ?? undefined
  const avatorImage = el.querySelector('#img') as HTMLImageElement | null
  const avatarUrl =
    (avatorImage && (await DOMHelper.getImageSourceAsync(avatorImage))) ??
    undefined

  return {
    html,
    author,
    avatarUrl
  }
}

const parsePaidMessage = async (el: HTMLElement) => {
  const html = el.querySelector('#message')?.innerHTML
  const author = el.querySelector('#author-name')?.textContent ?? ''
  const avatorImage = el.querySelector('#img') as HTMLImageElement | null
  const avatarUrl =
    (avatorImage && (await DOMHelper.getImageSourceAsync(avatorImage))) ??
    undefined
  const amount = el.querySelector('#purchase-amount')?.textContent ?? ''
  const card = el.querySelector('#card > #header') as HTMLElement | null
  const backgroundColor = (card && getBackgroundColor(card, 0.8)) ?? undefined

  return {
    html,
    author: `${author} - ${amount}`,
    avatarUrl,
    backgroundColor
  }
}

const parsePaidSticker = async (el: HTMLElement) => {
  const author = el.querySelector('#author-name')?.textContent
  const avatorImage = el.querySelector('#img') as HTMLImageElement | null
  const avatarUrl =
    (avatorImage && (await DOMHelper.getImageSourceAsync(avatorImage))) ??
    undefined
  const amount = el.querySelector('#purchase-amount-chip')?.textContent ?? ''
  const card = el.querySelector('#card') as HTMLElement | null
  const backgroundColor = (card && getBackgroundColor(card, 0.8)) ?? undefined
  const stickerImage = el.querySelector(
    '#sticker > #img'
  ) as HTMLImageElement | null
  const stickerUrl =
    (stickerImage && (await DOMHelper.getImageSourceAsync(stickerImage))) ??
    undefined

  return {
    stickerUrl,
    author: `${author} - ${amount}`,
    avatarUrl,
    backgroundColor
  }
}

const parseMembershipItem = async (el: HTMLElement) => {
  const eventText = el.querySelector('#author-name')?.textContent ?? undefined
  const detailText =
    el.querySelector('#header-subtext')?.textContent ?? undefined
  const avatorImage = el.querySelector('#img') as HTMLImageElement | null
  const avatarUrl =
    (avatorImage && (await DOMHelper.getImageSourceAsync(avatorImage))) ??
    undefined
  const header = el.querySelector('#card > #header') as HTMLElement | null
  const backgroundColor =
    (header && getBackgroundColor(header, 0.8)) ?? undefined

  return {
    html: detailText,
    author: eventText,
    avatarUrl,
    backgroundColor
  }
}

type Params = {
  html?: string
  author?: string
  avatarUrl?: string
  stickerUrl?: string
  backgroundColor?: string
}

export const parse = async (el: HTMLElement): Promise<Params | undefined> => {
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
