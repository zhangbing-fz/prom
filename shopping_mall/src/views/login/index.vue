<template>
  <!-- 背景图模板登录页 -->
  <div class="login" @keydown.enter="handleSubmit" id="login">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="md-log-in"></Icon>欢迎登陆
        </p>
        <div class="form-con">
          <Form ref="form" :model="form" :rules="rules">
            <FormItem prop="username">
              <i-input v-model="form.username" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="ios-person"></Icon>
                </span>
              </i-input>
            </FormItem>
            <FormItem prop="password">
              <i-input type="password" v-model="form.password" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="14" type="ios-lock"></Icon>
                </span>
              </i-input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long :loading="submitLoading">登录</Button>
            </FormItem>
          </Form>
          <p class="login-tip flex-center-between"></p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      //登录表单数据
      form: {
        username: "",
        password: ""
      },
      //登录表单校验规则
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      submitLoading: false //登录提交时loading
    };
  },
  computed: {},
  methods: {
    ...mapMutations(["saveLogin"]),
    async handleSubmit() {
      await this.validateForm("form");
      this.submitLoading = true;
      this.$http.post("/login", this.form).then(res => {
        // 这里的后台我不写了 证明框架搭配的跨域通了就行
        // 这里我就写假数据了
        this.saveLogin(res.data);
        this.$router.replace({
          name: "home"
        });
      });
    }
  }
};
</script>
<style  lang="less">
.login {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  &-con {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
    z-index: 10;
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con {
      padding: 10px 0 0;
    }
    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
</style>
