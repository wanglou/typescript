<template>
  <div class="login">
    <div class="container">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item align="left">
          <el-checkbox v-model="rememberPassword">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'

// Define the component in class-style
@Component
export default class login extends Vue {
  // ***** data *****
  ruleForm = {
    userName: '',
    password: ''
  }
  rememberPassword = false
  rules = {
    userName: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
    ],
  }
  
  // ***** 生命周期 *****
  created() {
    this.getCookie()
  }
  // ***** 方法 *****
  // 登录
  submitForm (formName: string) {
   (this.$refs[formName] as any).validate((valid) => {
      if (valid) {
        this.$router.push('/')
        this.setCookie()
      }
    })
  }
  // 设置cookie
  setCookie () {
    if (this.rememberPassword) {
      let Days = 7;
      let date = new Date(); 
      date.setTime(date.getTime() + Days*24*60*60*1000);
      document.cookie = `userName=${this.ruleForm.userName};expires=${(date as any).toGMTString()}`
      document.cookie = `password=${this.ruleForm.password};expires=${(date as any).toGMTString()}`
      document.cookie = `checked=${this.rememberPassword};expires=${(date as any).toGMTString()}`
    }
  }
  
  // 获取cookie
  getCookie () {
    let reg = document.cookie.split('; ')
    let cookieObj = {}
    reg.forEach(item => {
      cookieObj[item.split('=')[0]] = item.split('=')[1]
    })
    if ((cookieObj as any).checked === 'true') {
      this.rememberPassword = true
      this.ruleForm = {
        userName: (cookieObj as any).userName,
        password: (cookieObj as any).password
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .login {
    .container {
      width: 500px;
      margin: 50px auto 0;
      .el-button {
        width: 100%;
      }
    }
  }
</style>
