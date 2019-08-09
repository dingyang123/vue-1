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
        left-icon="contact"
        :error-message="errors.first('mobile')"
      />
      <van-field
        v-validate="'required|digits:6'"
        name="code"
        v-model="user.code"
        label="验证码"
        placeholder="请输入验证码"
        clearable
        left-icon="like-o"
        :error-message="errors.first('code')"
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
  created () {
    const dict = {
      custom: {
        mobile: {
          required: '手机号不能为空',
          digits: '手机号必须为11位'
        },
        code: {
          required: '验证码不能为空',
          digits: '验证码必须为6位'
        }
      }
    }

    // or use the instance method
    this.$validator.localize('zh_cn', dict)
  },
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    async handleLogin () {
      // 表单验证
      const valid = await this.$validator.validate()
      if (!valid) {
        // do stuff if not valid.
        return this.$toast.fail('登录失败')
      }
      try {
        const data = await login(this.user)
        // 记录登录状态
        // window.localStorage.setItem('user', data)
        this.$store.commit('setUser', data)
        // 跳转页面
        this.$router.push({ name: 'home' })
        this.$toast.success('登录成功')
      } catch (err) {
        this.$message.error('登录失败' + err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn {
  padding: 20px;
  display: flex;
  justify-content: center;
  .btn {
    width: 60%;
  }
}
</style>
