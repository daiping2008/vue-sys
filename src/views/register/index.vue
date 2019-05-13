<template>
  <div class="register">
    <div class="register-container">
      <div class="title">在线后台管理系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="用户名" prop='username'>
          <el-input type="text" v-model="ruleForm.username" placeholder="输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop='email'>
          <el-input type="text" v-model="ruleForm.email" placeholder="输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
          <el-input type="password" v-model="ruleForm.password" placeholder="输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop='cpassword'>
          <el-input type="password" v-model="ruleForm.cpassword" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item label="选择身份">
          <el-select class="w-100" v-model="ruleForm.identify" :value="ruleForm.identity" placeholder="请选择">
            <el-option label="员工" value="0"></el-option>
            <el-option label="管理员" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-100" @click="onSubmit('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import UserServer from '@/server/user'
const userServer = new UserServer()
export default {
  name: 'register',
  data () {
    const validatorPass = (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        email: '',
        password: '',
        cpassword: '',
        identify: 0
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'change' },
          { min: 2, max: 20, message: '长度在2到20个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '邮箱格式不对' },
          { required: true, message: '邮箱不能为空' }
        ],
        password: [
          { required: true, message: '密码不能为空' },
          { min: 6, max: 20, message: '长度在6到20个字符', trigger: 'blur' }
        ],
        cpassword: [
          { required: true, message: '密码不能为空' },
          { min: 6, max: 20, message: '长度在6到20个字符', trigger: 'blur' },
          { validator: validatorPass, trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    onSubmit (ruleName) {
      this.$refs[ruleName].validate(valid => {
        if (valid) {
          userServer.register({
            username: this.ruleForm.username,
            email: this.ruleForm.email,
            password: this.ruleForm.password,
            identify: this.ruleForm.identify
          }).then(res => {
            this.$router.push({ name: 'login' })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/img/bg.jpg');
  background-size: 100% 100%;
}
.register-container{
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
