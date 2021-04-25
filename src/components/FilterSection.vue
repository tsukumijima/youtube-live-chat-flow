<template>
  <div class="filter-section">
    Filter Messages by
    <a href="#" @click.prevent="handleClickLink">
      Chat Filter for YouTube Live
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const handleClickLink = () => {
      window.open(
        'https://chrome.google.com/webstore/detail/chat-filter-for-youtube-l/jalcplhakmckbmlbidmbmpaegcpbejog'
      )
    }

    return {
      handleClickLink,
    }
  },
})
</script>
