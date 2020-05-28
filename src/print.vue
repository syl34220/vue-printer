<template>
  <div>
    <div ref="printArea">
      <div>
        <!--startprint-->
        <slot></slot>
        <!--endprint-->
      </div>
    </div>
  </div>
</template>
<script>
//@demo
//  <v-print :doPrint.sync="print">
//              <div v-for="(e, i) in new Array(200)" :key="i" class="fon">
//                     asssssssgfgdfgdfg
//                     <span class="a">烦烦烦方法</span>
//                 </div>
//         </v-print>
//         <el-button @click="print=true">打印</el-button>

export default {
  props: {
    doPrint: {
      // 这个必须用sync用法  当值为true时触发打印
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pClass: "",
    };
  },
  watch: {
    doPrint: function(n, o) {
      if (n) {
        this.printHandle();
      }
    },
  },
  methods: {
    printHandle() {
      const content = this.$refs.printArea.innerHTML;
      const div = document.createElement("div");
      div.setAttribute("class", "printArea");

      div.innerHTML = content;
      document.body.appendChild(div);
      window.print();
      document.body.removeChild(div);

      this.$emit("update:doPrint", false);
    },
  },
};
</script>
<style lang="scss">
.fon {
  font-size: 36px;
}
.a {
  margin-left: 20px;
}
.printArea {
  display: none;
}
@media print {
  body {
    & > * {
      display: none;
    }
    & > .printArea {
      display: block;
      position: absolute;
      background: #fff;
      top: 0;
      left: 0;
      width: 100%;
      min-height: 100%;
      z-index: 20000;
    }
  }
}
</style>
