<template>
  <div class="debounce-throttle">
    <el-form style="width: 500px;" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 40%;" type="primary" size="small" @click="login('ruleForm')"> 防抖登录 </el-button>
        <el-button style="width: 40%;" type="primary" size="small" @click="throttleLogin('ruleForm')"> 节流登录 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
// Define the component in class-style
@Component({
})
export default class debounceThrottle extends Vue {
  ruleForm = {
    userName: '',
    password: ''
  }
  rules = {
    userName: [
      { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ]
  }
  // 定时器
  timer = null
  throttleTimer = null
  login (formName: string):void {
    this.debounce(this.afterLogin, 1000)
    // (this.$refs[formName] as any).validate((valid) => {
    //   if (valid) {
    //   }
    // })
  }
  afterLogin ():void {
    console.log('submit!')
  }
  // 防抖
  debounce: Function = (fn: Function, delay: number): void => {
    this.timer && clearTimeout(this.timer)
    this.timer = setTimeout(fn, delay)
  }
  // 节流
  throttle: Function = (fn: Function, delay: number) => {
    if (!this.throttleTimer) {
      fn()
      this.throttleTimer = setTimeout(() => {
        clearTimeout(this.throttleTimer)
        this.throttleTimer = null
      }, delay)
    }
  }
  throttleLogin:Function = () => {
    this.throttle(this.afterLogin, 2000)
  }
}
</script>
<style lang="scss">
  .debounce-throttle {
  }
</style>