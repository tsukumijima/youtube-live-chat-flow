<template>
  <v-card class="pa-5" flat>
    <v-switch
      v-model="bottomChatFormEnabled"
      label="Bottom Chat Form"
      hint="Move chat form to bottom controls on video (Page reload required)"
      persistent-hint
    />
  </v-card>
</template>

<script>
export default {
  computed: {
    bottomChatFormEnabled: {
      get() {
        return this.$store.state.bottomChatFormEnabled
      },
      set(value) {
        this.$store.commit('setBottomChatFormEnabled', {
          bottomChatFormEnabled: value
        })
      }
    }
  }
}
</script>
