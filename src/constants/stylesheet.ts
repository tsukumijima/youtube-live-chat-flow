import className from '~/constants/class-name'

export const parentCode = `
.${className.focused} .html5-video-player .ytp-chrome-bottom {
  opacity: 1!important;
}
.${className.focused} .html5-video-player .ytp-gradient-bottom {
  display: block!important;
  opacity: 1!important;
}
.${className.focused}.${className.grow} .ytp-chrome-bottom .ytp-chrome-controls .ytp-left-controls,
.${className.focused}.${className.grow} .ytp-chrome-bottom .ytp-chrome-controls .ytp-right-controls {
  max-width: 0;
}
.${className.grow} .ytp-chrome-bottom .ytp-chrome-controls .ytp-left-controls,
.${className.grow} .ytp-chrome-bottom .ytp-chrome-controls .ytp-right-controls {
  overflow: hidden;
  max-width: 256px;
  transition: max-width .5s;
}
.${className.small} .${className.controller} #top #input-container yt-live-chat-author-chip {
  display: none;
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
.html5-video-player.ytp-fullscreen
.${className.controller} #interaction-message yt-live-chat-message-renderer #button paper-button {
  height: 40px;
  font-size: 14px;
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
  user-select: none;
}

.ytp-chrome-bottom .ytp-chrome-controls {
  position: relative;
}
.ytp-chrome-bottom .ytp-chrome-controls .ytp-right-controls .${className.controlButton} svg {
  fill: white;
}
.ytp-chrome-bottom .ytp-chrome-controls .ytp-right-controls .ytp-fullerscreen-edu-button {
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
.${className.controller}:hover #interaction-message {
  display: block;
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
yt-live-chat-author-chip #author-name {
  color: inherit;
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
yt-live-chat-text-input-field-renderer#input #label {
  color: inherit;
}
.${className.controller} #top #input-container
yt-live-chat-text-input-field-renderer#input[has-text] #label {
  opacity: 0;
}
.${className.controller} #top #input-container
yt-live-chat-text-input-field-renderer#input #label {
  position: absolute;
  top: unset!important;
  left: 1px;
  right: 1px;
  padding-left: 4px;
  pointer-events: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  white-space: nowrap;
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

.${className.controller} #interaction-message {
  position: absolute;
  left: 8px;
  right: 8px;
  display: none;
}
.${className.controller} #interaction-message yt-live-chat-message-renderer #subtext {
  display: none;
}
.${className.controller} #interaction-message yt-live-chat-message-renderer #button yt-button-renderer {
  width: 100%;
  margin: 4px 0;
}
.${className.controller} #interaction-message yt-live-chat-message-renderer #button paper-button {
  font-size: 10px;
  padding: 0 8px;
  height: 28px;
}
`

export const code = `
yt-live-chat-header-renderer > #primary-content {
  min-width: 0;
}

yt-live-chat-header-renderer > #primary-content > #view-selector > yt-sort-filter-sub-menu-renderer {
  width: 100%;
}

.${className.menuButton}.${className.menuButtonActive} > button > yt-icon {
  color: #4387f1!important;
}

.${className.menuButton} > button > yt-icon > svg {
  pointer-events: none;
  display: block;
  width: 100%;
  height: 100%;
}

.${className.description} {
  flex: 1;
  display: flex;
  align-items: center;
}
.${className.description} {
  flex: 1;
  display: flex;
  align-items: center;
}
.${className.description} > button {
  text-align: center;
  font-size: smaller;
  flex: 1;
  color: var(--yt-spec-text-secondary);
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  --webkit-appearance: none;
}
`
