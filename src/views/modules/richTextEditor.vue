<template>
  <div class="rich-text-editor">
    <quill-editor
      v-model="content" 
      ref="myQuillEditor" 
      :options="editorOption" 
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady"
      @change="onEditorChange($event)">
    </quill-editor>

    <div v-if="emojiShow" class="emoji-dialog" :style="{left: emojiDialogLeft + 'px', top: emojiDialogTop + 'px'}">
      <span v-for="(item, index) in emojiList" :key="index" @click="emojiClick(item)"> {{ item.char }} </span>
    </div>

    <div class="content-show" v-html="content"></div>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import Quill from 'quill'
import toolBar from 'quill/modules/toolbar.js'  //添加
Quill.register('modules/toolBar', toolBar)  //添加
// emoji
const appData = require("@/utils/emoji.json");
// Define the component in class-style
@Component({
  components: {
    quillEditor
  }
})
export default class richTextEditor extends Vue {
  emojiDialogLeft = 0
  emojiDialogTop = 0
  emojiShow = false
  emojiList = appData
  content:string = ''
  editorOption = {
    placeholder: '请输入内容及工作量',
    modules: {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{'header': 1}, {'header': 2}],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{'script': 'sub'}, {'script': 'super'}],
          [{'indent': '-1'}, {'indent': '+1'}],
          [{'direction': 'rtl'}],
          [{'size': ['small', false, 'large', 'huge']}],
          [{'header': [1, 2, 3, 4, 5, 6, false]}],
          [{'color': []}, {'background': []}],
          [{'font': []}],
          [{'align': []}],
          ['clean'],
          ['link', 'image', 'video'],
          ['emoji']
        ],
        handlers: {
          'emoji': function (value) {
            if (value) {
            }
          }
        }
      }
    }
  }
  //自定义按钮内容初始化
  initButton () {
    // 表情库
    // https://unpkg.com/emoji.json@13.1.0/emoji.json
    const sourceEditorButton = document.querySelector('.ql-emoji')
    sourceEditorButton.innerHTML = `
      <div class="emoji-class">
        <p> 表情 </p>
      </div>
    `

    const emojiEle = document.querySelector('.quill-editor .ql-emoji') as any
    emojiEle.onclick = () => {
      this.emojiShow = !this.emojiShow
      this.emojiDialogLeft = emojiEle.offsetLeft + 10
      this.emojiDialogTop = emojiEle.offsetTop + 25
    }
    window.onresize = () => {
      this.emojiShow = false
    }
  }
  // 准备编辑器
  onEditorReady (editor) {
  }
  // 失去焦点事件
  onEditorBlur () {}
  // 获得焦点事件
  onEditorFocus () {
  }
  // 内容改变事件
  onEditorChange () {}

  // 点击表情
  emojiClick (item) {
    const range = this.editor.getSelection()
    this.editor.insertEmbed(range.index, item.char)
    this.emojiShow = false
  }

  get editor () {
    return (this.$refs.myQuillEditor as any).quill
  }

  mounted () {
    this.initButton();
  }
}
</script>
<style lang="scss">
  .rich-text-editor {
    .quill-editor {
      .ql-container {
        height: 200px;
      }
      .emoji-class {
        p {
          width: 40px;
        }
      }
    }

    .content-show {
      margin-top: 20px;
    }

    .emoji-dialog {
      position: absolute;
      width: 300px;
      padding: 10px;
      border-radius: 10px;
      background: #ddd;
      span {
        cursor: pointer;
      }
    }
  }
</style>