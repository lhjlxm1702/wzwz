<template>
  <footer class="VPFooter">
    <div class="container">
      <p class="message" v-html="footerMessage"></p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useSiteData } from 'vitepress'

const site = useSiteData()
const footerMessage = computed(() => {
  return site.value?.themeConfig?.footer?.message || ''
})
</script>

<style scoped>
/* 保持与默认主题一致的基础间距 */
.VPFooter { padding: 16px 0; }
.VPFooter .container { max-width: 100%; }
.VPFooter .message { margin: 0; }
</style>
