<template>
  <tr>
    <th
      v-for="header in headers"
      :key="header.text"
      class="text-xs-left"
      v-text="header.text"
    />
  </tr>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      default: () => []
    }
  }
}
</script>
