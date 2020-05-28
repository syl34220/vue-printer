# 安装 
   npm install -S syl-vue-printer
# 使用方式
```
<template>
  <v-print :doPrint.sync="print">
    <div>需要打印的内容  支持根据内容自动分页</div>
  </v-print>
  <el-button @click="print=true">打印</el-button>
<template>
<script>
import vPrint from 'syl-vue-printer'
export default {
    data(){
        return {
            print:false, // 
        }
    }
}
</script>
```