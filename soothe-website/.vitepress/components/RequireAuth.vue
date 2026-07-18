<template>
  <!-- ClientOnly 是必须的，防止 VitePress 打包时因找不到浏览器环境而报错 -->
  <ClientOnly>
    <!-- 如果正在检查状态，显示白屏过渡 -->
    <div v-if="isChecking" style="min-height: 200px;"></div>
    
    <!-- 如果已登录，展示被包裹的真实内容（插槽） -->
    <div v-else-if="isAuthenticated">
      <slot></slot>
    </div>

    <!-- 如果未登录，展示一把大锁和提示 -->
    <div v-else class="lock-screen">
      <div class="lock-icon">🔒</div>
      <h3>专属内容，请先登录</h3>
      <p class="desc">该页面的“经典资料”仅面向注册用户开放。<br>请登录后继续查看您的专属内容。</p>
      <a href="/login" class="login-btn">前 往 登 录</a>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isChecking = ref(true)
const isAuthenticated = ref(false)

onMounted(() => {
  // 检查浏览器里有没有存 uid，有就代表登录了
  const uid = localStorage.getItem('soothe_uid')
  isAuthenticated.value = !!uid
  isChecking.value = false
})
</script>

<style scoped>
.lock-screen {
  text-align: center;
  padding: 60px 20px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 12px;
  margin-top: 40px;
  border: 1px solid var(--vp-c-divider);
}
.lock-icon {
  font-size: 48px;
  margin-bottom: 20px;
}
.lock-screen h3 {
  margin: 0 0 16px 0;
  color: var(--vp-c-text-1);
}
.desc {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 30px;
}
.login-btn {
  display: inline-block;
  background-color: var(--vp-c-brand);
  color: white !important;
  padding: 10px 32px;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  transition: opacity 0.3s;
}
.login-btn:hover {
  opacity: 0.8;
}
</style>