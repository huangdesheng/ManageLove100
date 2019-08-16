<template>
  <div data-page="login">
    <div class="user-login">
      <h3 style="text-align:center;margin-bottom:25px;color: rgba(0,0,0,.43);">欢迎登录乐爱心</h3>
      <el-form :rules="rules" ref="form" :model="form" style="width: 360px;" @submit.native.prevent>
        <el-form-item prop="userName">
          <el-input
            type="text"
            name="userName"
            v-model="form.username"
            placeholder="请输入用户名"
            :autofocus="true"
          >
            <i slot="prefix" class="el-input__icon el-icon-setting"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" name="password" v-model="form.password" placeholder="请输入密码">
            <i slot="prefix" class="el-input__icon el-icon-setting"></i>
          </el-input>
        </el-form-item>
        <textarea name id="publicSrc" cols="30" rows="10" style="display:none">

          -----BEGIN RSA PRIVATE KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCK8ndL6c6GpbqOfG8WvmvgzSMP3JI/HYR3VwXM
xo7xomFu99Nfvhsz/zSpr94uijSB/JCLl6g2sKdqQjKGIvGJalwPHL9j1a0GwC1cxTW9yyUMvrIS
Mn4al2IuWiil/on6pUHeeUOTNqImfB0l30AyGha6OwROU7q7E5z1tiZNYwIDAQAB
-----END RSA PRIVATE KEY-----
        </textarea>
        <el-form-item>
          <el-button style="width:100%;" type="primary" native-type="submit" @click="formSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { JSEncrypt } from "jsencrypt";
import service from "@/api";
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },

  methods: {
    formSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let publicKey = document.getElementById("publicSrc").value;
          let encryptor = new JSEncrypt(); // 新建JSEncrypt对象
          encryptor.setPublicKey(publicKey); // 设置公钥
          let rsaPassWord = encryptor.encrypt(this.form.password); // 对密码进行加密
          this.$store
            .dispatch("qxLoginByUsername", {
              username: this.form.username,
              password: encryptor.encrypt(this.form.password)
            })
            .then(res => {
              //登录成功
              if (res.code === 200) {
                // this.menusLists();
                this.form.username = "";
                this.form.password = "";
                this.$router.replace({
                  path: "/"
                });
              } else {
                this.$message({ message: `${res.message}`, type: "warning" });
                return false;
              }
            });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
div[data-page="login"] {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgb(240, 242, 245);
}
.user-login {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
}
</style>
