<template>
  <div class="login">
    <div class="login-container">
      <div class="title">在线后台管理系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="邮箱" prop='email'>
          <el-input type="email" v-model="ruleForm.email" placeholder="输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
          <el-input type="password" v-model="ruleForm.password" placeholder="输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-100" @click="onSubmit('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import jwtDecode from 'jwt-decode'
import { isEmpty } from '@/utils/tools'
import UserServer from '@/server/user'
const userServer = new UserServer()
export default {
  name: 'login',
  data () {
    return {
      ruleForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['setIsAutnenticated', 'setUser']),
    onSubmit (ruleName) {
      this.$refs[ruleName].validate(valid => {
        if (valid) {
          userServer.login({ email: this.ruleForm.email, password: this.ruleForm.password })
            .then(res => {
              const { token } = res
              const user = jwtDecode(token)
              window.localStorage.setItem('token', token)
              this.setUser(user)
              this.setIsAutnenticated(!isEmpty(user))
              this.$router.push('/')
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/img/bg.jpg');
  background-size: 100% 100%;
}
.login-container{
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 50%;
  margin-left: -210px;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.title{
  color:#fff;
  font-size: 16px;
  margin-bottom: 10px;
}
</style>
