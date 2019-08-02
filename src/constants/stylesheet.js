import className from './class-name'

const code = `
.${className.focused} .html5-video-player .ytp-chrome-bottom {
  opacity: 1!important;
}
.${className.focused} .html5-video-player .ytp-gradient-bottom {
  display: block!important;
  opacity: 1!important;
}

.html5-video-player.ytp-fullscreen
.${className.controller} #top yt-img-shadow#avatar img {
  width: 36px;
  height: 36px;
}
.html5-video-player.ytp-fullscreen
.${className.controller} #top #input-container
yt-live-chat-author-chip {
  display: none;
}
.html5-video-player.ytp-fullscreen
.${className.controller} #top #input-container
yt-live-chat-text-input-field-renderer#input #label {
  padding-left: 8px;
}
.html5-video-player.ytp-fullscreen
.${className.controller} #top #input-container
yt-live-chat-text-input-field-renderer#input #input {
  line-height: 36px;
  padding: 0 8px;
}
.html5-video-player.ytp-fullscreen
.${className.controller} #message-buttons #send-button yt-icon-button#button {
  width: 36px;
  height: 36px;
}
.html5-video-player.ytp-fullscreen
.${className.controller} #message-buttons #countdown {
  width: 36px;
  height: 36px;
  right: 0;
}

.html5-video-container .${className.message} {
  align-items: center;
  display: flex;
  font-weight: bold;
  left: 0;
  position: absolute;
  vertical-align: bottom;
  white-space: nowrap;
  box-sizing: border-box;
}
.html5-video-container .${className.message} .${className.messageAvatar} {
  border-radius: 50%;
  object-fit: cover;
}
.html5-video-container .${className.message}
.${className.messageMessage} > img {
  vertical-align: bottom;
}
.html5-video-container .${className.messageTwoLine} {
  align-items: start;
}
.html5-video-container .${className.messageTwoLine} > div {
  display: flex;
  flex-direction: column;
  align-items: start;
}
.html5-video-container .${className.messageSuperChat} > div,
.html5-video-container .${className.messageSuperSticker} > div,
.html5-video-container .${className.messageMembership} > div {
  align-items: start;
  display: flex;
  vertical-align: bottom;
  white-space: nowrap;
}
.html5-video-container .${className.messageSuperChat} > div > div,
.html5-video-container .${className.messageSuperSticker} > div > div,
.html5-video-container .${className.messageMembership} > div > div {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.ytp-chrome-bottom .ytp-chrome-controls {
  position: relative;
}
.ytp-chrome-bottom .ytp-chrome-controls .ytp-right-controls .ytp-fullerscreen-edu-button {
  display: none;
}

.${className.controller}.${className.smallController}
#top #input-container yt-live-chat-author-chip {
  display: none;
}

.${className.controller} {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 8px;
  height: 100%;
  box-sizing: border-box;
}
.${className.controller} #top {
  display: flex;
  flex: 1;
  min-width: 0;
  align-items: center;
  height: 100%;
}
.${className.controller} #top yt-img-shadow#avatar {
  border-radius: 50%;
  margin-right: 8px;
  margin-bottom: 1px;
  overflow: hidden;
}
.${className.controller} #top #input-container {
  display: flex;
  flex: 1;
  min-width: 0;
  align-items: center;
  height: 100%;
}
.${className.controller} #top #input-container
yt-live-chat-author-chip {
  display: flex;
  margin-right: 8px;
  max-width: 128px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.${className.controller} #top #input-container
yt-live-chat-text-input-field-renderer#input {
  position: relative;
  display: flex;
  flex: 1;
  min-width: 0;
  align-items: center;
  height: 100%;
  margin-right: 8px;
}
.${className.controller} #top #input-container
yt-live-chat-text-input-field-renderer#input[has-text] #label {
  opacity: 0;
}
.${className.controller} #top #input-container
yt-live-chat-text-input-field-renderer#input #label {
  position: absolute;
  top: 0;
  left: 1px;
  padding-left: 4px;
  pointer-events: none;
}
.${className.controller} #top #input-container
yt-live-chat-text-input-field-renderer#input #input {
  flex: 1;
  min-width: 0;
  height: 66%;
  line-height: 24px;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 0 4px;
  outline: none;
  transition: border-color .5s;
}
.${className.controller} #top #input-container
yt-live-chat-text-input-field-renderer#input[focused] #input {
  border-color: var(--yt-live-chat-text-input-field-active-underline-color, hsl(206.1, 79.3%, 52.7%));
}
.${className.controller} #message-buttons {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  line-height: initial;
}
.${className.controller} #message-buttons #count {
  margin-right: 8px;
}
.${className.controller} #message-buttons #send-button yt-button-renderer {
  color: inherit!important;
}
.${className.controller} #message-buttons #send-button yt-icon-button {
  color: inherit;
}
.${className.controller} #message-buttons #send-button yt-icon-button[disabled] {
  cursor: initial;
  opacity: .5;
}
.${className.controller} #message-buttons #send-button yt-icon-button#button {
  display: block;
  height: 24px;
  width: 24px;
  padding: 0;
}
.${className.controller} #message-buttons #send-button yt-icon-button#button
paper-ripple {
  display: none;
}
.${className.controller} #message-buttons #countdown {
  position: absolute;
  width: 24px;
  height: 24px;
  opacity: 0;
  transition: opacity .5s;
  pointer-events: none;
}
.${className.controller} #message-buttons #countdown[countdown-active] {
  opacity: 1;
}
.${className.controller} #message-buttons #countdown circle {
  fill: none;
  stroke-linecap: square;
  stroke-width: 2;
  stroke: currentColor;
}
.${className.controller} #message-buttons #countdown #countdown-background {
  opacity: 0.3;
}
.${className.controller} #message-buttons #countdown #countdown-line {
  stroke-dasharray: 62.8318;
  transform: translate(0, 24px) rotateZ(-90deg);
}
`

export default code
