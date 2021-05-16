# Flow Chat for YouTube Live

![badge](https://github.com/fiahfy/youtube-live-chat-flow/workflows/Web%20Extension%20CI/badge.svg)

> Chrome Extension for Flow Chat Messages on YouTube Live.

## Features

- Flow messages over the video.
- Change color, size and speed for messages.
- Show author and avatar on messages.
- Show super chats and super stickers.
- Filter banned words.
- Move the chat input to bottom controls on the video.
- Add helper menu buttons on the chat list.

## Screenshots

![screenshot](.github/img/screenshot1.gif)
![screenshot](.github/img/screenshot2.png)

## Installation

1. Download `archive.zip` from [releases page](https://github.com/fiahfy/youtube-live-chat-flow/releases) and unzip this file.
2. Open the Extension Management page by navigating to `chrome://extensions`.
3. Enable Developer Mode by clicking the toggle switch next to **Developer mode**.
4. Click the **LOAD UNPACKED** button and select the unpacked directory named `app`.

## Development

```bash
# install dependencies
yarn

# watch files changed and reload extension
yarn dev
```
