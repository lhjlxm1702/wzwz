<template>
  <div class="auth-box">
    <div v-if="isLoggedIn" class="user-profile">
      <h3>欢迎回来！</h3>
      <p>用户邮箱：{{ userEmail }}</p>
      <p>会员状态：<span :class="isMember ? 'vip' : 'normal'">{{ isMember ? '终身VIP会员' : '普通用户' }}</span></p>
      <button @click="logout" class="btn logout-btn">退出登录</button>
    </div>
    <div v-else class="auth-form">
      <h3>{{ isLoginMode ? '账号登录' : '新用户注册' }}</h3>
      <input type="email" v-model="email" placeholder="请输入电子邮箱" class="input-field" />
      <input type="password" v-model="password" placeholder="请输入密码" class="input-field" />
      <div v-if="!isLoginMode" class="register-extras">
        <input type="password" v-model="confirmPassword" placeholder="请再次输入密码" class="input-field" />
        <div class="input-group">
          <label class="field-label">宝宝生日 <span class="required">*</span></label>
          <input type="date" v-model="babyBirthday" class="input-field date-field" />
        </div>
        <div class="input-group">
          <label class="field-label">邀请码 (选填)</label>
          <input type="text" v-model="inviteCode" placeholder="填写后由邀请人拉进家政群、育儿群" class="input-field" />
        </div>
      </div>
      <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-msg">{{ successMessage }}</p>
      <button @click="submitAuth" class="btn submit-btn" :disabled="isLoading">
        {{ isLoading ? '处理中...' : (isLoginMode ? '登 录' : '注 册') }}
      </button>
      <p class="toggle-text" @click="switchMode">
        {{ isLoginMode ? '没有账号？点击去注册' : '已有账号？点击去登录' }}
      </p>
      <!-- 回到首页按钮 -->
      <button @click="goHome" class="btn home-btn">回到首页</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const isLoginMode = ref(true)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const babyBirthday = ref('')
const inviteCode = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)
const isLoggedIn = ref(false)
const userEmail = ref('')
const isMember = ref(false)

onMounted(() => {
  const storedEmail = localStorage.getItem('soothe_email')
  if (storedEmail) {
    isLoggedIn.value = true
    userEmail.value = storedEmail
    isMember.value = localStorage.getItem('soothe_is_member') === 'true'
  }
})

const switchMode = () => {
  isLoginMode.value = !isLoginMode.value
  errorMessage.value = ''
  successMessage.value = ''
  password.value = ''
  confirmPassword.value = ''
  babyBirthday.value = ''
  inviteCode.value = ''
}

const submitAuth = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  if (!email.value || !password.value) {
    errorMessage.value = '邮箱和密码不能为空！'
    return
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errorMessage.value = '请输入正确的电子邮箱格式！'
    return
  }
  if (!isLoginMode.value) {
    if (password.value !== confirmPassword.value) {
      errorMessage.value = '两次输入的密码不一致！'
      return
    }
    if (!babyBirthday.value) {
      errorMessage.value = '请选择宝宝生日，方便我们提供精准服务！'
      return
    }
  }
  isLoading.value = true
  const endpoint = isLoginMode.value ? '/api/auth/login' : '/api/auth/register'
  const apiUrl = `https://soothe.jx.cn${endpoint}`
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        baby_birthday: isLoginMode.value ? '' : babyBirthday.value,
        yaoQinMa: isLoginMode.value ? '' : inviteCode.value,
        souJiHao: '',
        display_name: '网页用户',
        gender: '',
        nation: ''
      })
    })
    const data = await response.json()
    if (!response.ok) {
      const backendError = data.error || '请求失败，请重试'
      if (backendError === 'Invalid credentials') {
        errorMessage.value = '邮箱或密码错误，请检查！'
      } else if (backendError === 'Registration failed. Email might already exist.') {
        errorMessage.value = '注册失败，该邮箱可能已被注册。'
      } else {
        errorMessage.value = backendError
      }
    } else {
      if (isLoginMode.value) {
        localStorage.setItem('soothe_uid', data.uid)
        localStorage.setItem('soothe_email', data.email)
        localStorage.setItem('soothe_is_member', data.is_member)
        isLoggedIn.value = true
        userEmail.value = data.email
        isMember.value = data.is_member
      } else {
        successMessage.value = '注册成功！请登录。'
        isLoginMode.value = true
        password.value = ''
        confirmPassword.value = ''
      }
    }
  } catch (error) {
    errorMessage.value = '服务器开了小差或网络中断，请稍后再试。'
  } finally {
    isLoading.value = false
  }
}

const logout = () => {
  localStorage.removeItem('soothe_uid')
  localStorage.removeItem('soothe_email')
  localStorage.removeItem('soothe_is_member')
  isLoggedIn.value = false
  email.value = ''
  password.value = ''
}

// 回到首页函数
const goHome = () => {
  window.location.href = '/'
}
</script>

<style scoped>
.auth-box {max-width: 400px;margin: 30px auto;padding: 30px;border-radius: 12px;background-color: var(--vp-c-bg-soft);box-shadow: 0 4px 12px rgba(0,0,0,0.1);text-align: center;}
.input-field {width: 100%;padding: 12px;margin-bottom: 15px;border: 1px solid var(--vp-c-divider);border-radius: 8px;background-color: var(--vp-c-bg);color: var(--vp-c-text-1);}
.register-extras {text-align: left;margin-top: 5px;}
.input-group {margin-bottom: 5px;}
.field-label {display: block;font-size: 13px;color: var(--vp-c-text-2);margin-bottom: 6px;padding-left: 4px;}
.required {color: #e74c3c;}
.date-field {font-family: inherit;}
.btn {width: 100%;padding: 12px;border: none;border-radius: 8px;font-weight: bold;cursor: pointer;transition: opacity 0.3s;}
.btn:hover {opacity: 0.8}
.submit-btn {background-color: var(--vp-c-brand);color: white;}
.logout-btn {background-color: #e74c3c;color: white;margin-top: 15px;}
.toggle-text {margin-top: 15px;font-size: 14px;color: var(--vp-c-brand);cursor: pointer;}
.toggle-text:hover {text-decoration: underline}
.error-msg {color: #e74c3c;font-size: 14px;margin-bottom: 10px}
.success-msg {color: #2ecc71;font-size: 14px;margin-bottom: 10px}
.vip {color: #e67e22;font-weight: bold}
.normal {color: #95a5a6}
.home-btn {background-color: var(--vp-c-text-2);color: white;margin-top: 10px;}
</style>