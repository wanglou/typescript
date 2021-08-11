<template>
  <div class="es6-class">
    {{ a }}
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
import { extend } from 'vue/types/umd'
// Define the component in class-style
class Person {
  name
  constructor(parameters) {
    this.name = parameters
  }
  private toString () {
    return String(this.name)
  }
  public toStringA () {
    return this.toString()
  }
}
class PersonA extends Person {
  say () {
    return this.toStringA()
  }
}
@Component({
  
})

export default class ES6class extends Vue {
  a:any
  b: any
  created() {
    this.a = new Person(1).toStringA()
    // console.log(typeof this.a)
    this.b = new PersonA(12).say()
    console.log(typeof this.b)
  }
}
</script>
<style lang="scss">
  .es6-class {
  }
</style>