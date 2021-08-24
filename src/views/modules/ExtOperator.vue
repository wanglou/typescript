<template>
  <div class="extension-operator">
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
import service from '@/api/axios'
// Define the component in class-style
@Component({
  created () {
    this.ajaxApi({
      url: '/api/ierp/kapi/app/hbis_overseas/getTeamInfo',
      method: 'post',
      data: {}
    }).then(res => {
      console.log(res)
    })
  },
  methods: {
  }
})
export default class ExtOperator extends Vue {
  ajaxApi (config) {
    return new Promise((res) => {
      const {url = '', data = {}, method = 'get'} = config
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader("Content-type","application/json");
      xhr.setRequestHeader("accesstoken", 'this.app_token');
      xhr.send(JSON.stringify(data));
      xhr.onreadystatechange = function () {
        if (xhr.readyState==4  && xhr.status==200) {
          res(JSON.parse(xhr.responseText))
        }
      }
    })
  }
}
</script>
<style lang="scss">
  .extension-operator {
  }
</style>