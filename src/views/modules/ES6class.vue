<template>
  <div class="es6-class">
    {{ a }}
    <iframe id="iframe" width="100%" height="500" src="http://114.116.210.227:8080/bi/view?proc=1&action=viewer&hback=true&db=!6d4b!!8bd5!!5f39!!6846!.db&platform=PC&browserType=chrome" frameborder="0"></iframe>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
import { extend } from 'vue/types/umd'
// Define the component in class-style
class Person {
  name: number
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
  constructor (parameters) {
    super(parameters)
    console.log(this.name)
  }
  say () {
    return this.toStringA()
  }
}
@Component({
  
})

export default class ES6class extends Vue {
  a:any
  b: any
  created () {
    window.addEventListener('message', function(ev) {
      var data = ev.data;
      console.log(data)
    }, false);
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