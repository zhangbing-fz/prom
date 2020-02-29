<template>
  <div class="main">
    <span>汤大帅要开始敲代码了</span>
    <img src="../../assets/images/fengmian.jpg" alt>
  </div>
</template>
<script>
import son from "../../components/son";
export default {
  components: { son },
  data() {
    return {
      msg: "哈哈哈",
      songei: "",
      demo: "",
      demowatch: "",
      democom: {
        name: 0
      },
      demoval: ""
    };
  },
  watch: {
    demo(val) {
      this.demowatch = this.demo;
    },
    newVal(val) {
      this.demoval = val;
    }
  },
  computed: {
    newVal() {
      var a = this.democom.name + 111;
      return a;
    }
  },
  methods: {
    test() {
      this.$http.get("/test").then(res => {
        console.log(res);
      });
    }
  },
  created() {
    this.test();
  }
};
</script>
<style lang="less" >
.main {
  color: hotpink;
  font-size: 38px;
}
</style>
