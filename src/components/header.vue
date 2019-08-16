<style>
</style>
<template>
  <div class="header">
    <div>
      <h2>爱心100分管理后台</h2>
      <div>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{userName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="updatePass">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%" @close="handleClose">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <textarea name id="publicSrc" cols="30" rows="10" style="display:none">
          -----BEGIN RSA PRIVATE KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCK8ndL6c6GpbqOfG8WvmvgzSMP3JI/HYR3VwXM
xo7xomFu99Nfvhsz/zSpr94uijSB/JCLl6g2sKdqQjKGIvGJalwPHL9j1a0GwC1cxTW9yyUMvrIS
Mn4al2IuWiil/on6pUHeeUOTNqImfB0l30AyGha6OwROU7q7E5z1tiZNYwIDAQAB
-----END RSA PRIVATE KEY-----
        </textarea>
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="ruleForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="oldPass">
          <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserName,
  removeToken,
  removeUserName,
  removeMenus
} from "@/utils/authority.js";
import { JSEncrypt } from "jsencrypt";
import service from "@/api";
export default {
  data() {
    // 验证旧密码和新密码是否为空和两者是否相等
    var checkoldPass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入旧密码"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      ruleForm: {
        pass: "",
        checkPass: "",
        oldPass: "",
        name: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        oldPass: [{ validator: checkoldPass, trigger: "blur" }]
      }
    };
  },

  computed: {
    userName() {
      return this.$store.state.username;
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updatePassword(this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async updatePassword(ruleForm) {
      // 加密登录
      let publicKey = document.getElementById("publicSrc").value;
      let encryptor = new JSEncrypt(); // 新建JSEncrypt对象
      encryptor.setPublicKey(publicKey); // 设置公钥
      let oldPassWord = encryptor.encrypt(ruleForm.oldPass);
      let newPassWord = encryptor.encrypt(ruleForm.pass);
      let res = await service.updatePassword({
        newPassword: newPassWord,
        oldPassword: oldPassWord
      });
      console.log(res);
      if (res.code === 200) {
        this.dialogVisible = false;
        this.$message({
          message: "修改密码成功",
          type: "success"
        });
      }
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 关闭
    handleClose() {},
    // 修改
    updatePass() {
      this.dialogVisible = true;
    },
    // 退出登录
    loginOut() {
      // this.$confirm("确定要退出登录", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   center: true
      // })
      //   .then(() => {
      //     console.log(11111);
      //     removeToken("Authorization");
      //     removeUserName("userName");
      //     removeMenus("Menus");
      //     this.$router.replace("/login?redirect");
      //   })
      //   .catch(() => {
      //     console.log(22222);
      //     this.$message({
      //       type: "info",
      //       message: "已取消"
      //     });
      //   });

      this.$confirm("确定要退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true
      })
        .then(() => {
          removeToken("Authorization");
          removeUserName("userName");
          removeMenus("Menus");
          this.$router.replace("/login?redirect");
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 10%;
  background: #545c64;
  border-bottom: 1px solid #fff;
  > div {
    width: 95%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    margin: 0 auto;
    font-size: 16px;
    h2 {
      flex: 1;
      text-align: left;
    }
  }
}

.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 16px;
}
.demonstration {
  display: block;
  color: #fff;
  font-size: 16px;
  margin-bottom: 20px;
}

.el-dropdown-menu {
  padding: 10px 60px;
}
.el-dropdown-menu__item {
  padding: 10px 30px;
  border-top: 1px solid #f7f7f7;
  &:nth-of-type(1) {
    border-top: none;
  }
}
</style>