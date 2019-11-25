<template>
  <div class="login-container">
    <div class="login-box">
      <!-- logo部分 -->
      <div class="logo">
        <img src="~assets/imgs/logo.png"
             alt />
      </div>
      <el-form class="login-form"
               :model="loginLorm"
               :rules="rules"
               ref="loginFormRef">
        <!-- 用户名输入框 -->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user"
                    v-model="loginLorm.username" />
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input prefix-icon="iconfont icon-3702mima"
                    v-model="loginLorm.password"
                    type="password" />
        </el-form-item>

        <!-- 按钮 -->
        <el-row class="btns">
          <el-button type="primary"
                     @click="login">登陆</el-button>
          <el-button type="info"
                     @click="resetLoginForm">重置</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
  </div>
</template>

<script>
import { getLoginData } from 'network/login'

export default {
  name: 'Login',
  data() {
    return {
      loginLorm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return
        this._getLoginData()
      })
    },
    //  ------------- 网络请求的方法 --------------
    _getLoginData() {
      const loginData = this.loginLorm
      getLoginData(loginData).then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('登陆失败')
        } else {
          // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
          //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
          //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
          window.sessionStorage.setItem('token', res.data.token)
          this.$router.push('/home')
          return this.$message.success('登陆成功')
        }
      })
    }
  }
}
</script>

<style lang="less" scope>
.login-container {
  background-color: #2b4b6b;
  height: 100%;
}

.login-box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .logo {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px #ddd;

    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login-form {
  position: absolute;
  bottom: 25px;
  left: 0;
  right: 0;
  padding: 0 20px;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>