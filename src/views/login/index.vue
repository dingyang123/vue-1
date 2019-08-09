<template>
  <div class="login-wrap">
    <!-- 导航头 -->
    <van-nav-bar title="黑马头条" />
    <!-- 输入框 -->
    <van-cell-group>
  <van-field
    v-validate="'required|digits:11'"
    name="mobile"
    v-model="user.mobile"
    label="手机号"
    placeholder="请输入手机号"
    clearable
    left-icon='contact'
    :error-message="errors.first('mobile')"
  />
  <van-field
    v-model="user.code"
    label="验证码"
    placeholder="请输入验证码"
     clearable
     left-icon='like-o'
  >
  <van-button slot="button" size="small" type="default">发送验证码</van-button>
  </van-field>
</van-cell-group>

<!-- 登录按钮 -->
<div class="login-btn">
    <van-button @click="handleLogin" class="btn" type="info">登录</van-button>
</div>

  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    async   handleLogin () {
      // 表单验证
      try {
        const data = await login(this.user)
        // 记录登录状态
        // window.localStorage.setItem('user', data)
        this.$store.commit('setUser', data)
        // 跳转页面
        this.$router.push({ name: 'home' })
      } catch (err) {
        this.$message.error('登录失败' + err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn{
    padding: 20px;
    display: flex;
    justify-content: center;
    .btn{
        width: 60%;

    }
}
</style>
