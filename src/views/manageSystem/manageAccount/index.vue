<style>
</style>
<template>
  <div class="helpFul">
    <div>
      <div>
        <template>
          <header>
            <textarea name id="publicSrc" cols="30" rows="10" style="display:none">
          -----BEGIN RSA PRIVATE KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCK8ndL6c6GpbqOfG8WvmvgzSMP3JI/HYR3VwXM
xo7xomFu99Nfvhsz/zSpr94uijSB/JCLl6g2sKdqQjKGIvGJalwPHL9j1a0GwC1cxTW9yyUMvrIS
Mn4al2IuWiil/on6pUHeeUOTNqImfB0l30AyGha6OwROU7q7E5z1tiZNYwIDAQAB
-----END RSA PRIVATE KEY-----
        </textarea>
            <el-form :inline="true" class="demo-form-inline" style="text-align:right">
              <el-form-item>
                <el-button type="primary" @click="onSubmit">新增账号</el-button>
              </el-form-item>
            </el-form>
          </header>
        </template>
        <template>
          <section>
            <el-table :data="tableData" border style="width: 100%;text-align:center">
              <el-table-column type="index" label="序号" width="80"></el-table-column>
              <el-table-column prop="username" label="账号" min-width="120"></el-table-column>
              <el-table-column prop="roleName" label="用户角色" min-width="120"></el-table-column>
              <el-table-column prop="realName" label="负责人" min-width="120"></el-table-column>
              <el-table-column prop="postTime" label="添加时间" min-width="120"></el-table-column>
              <el-table-column prop="auditStatus" label="状态" min-width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 1">启用</span>
                  <span v-else-if="scope.row.status === -1">停用</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="120">
                <template slot-scope="scope">
                  <el-button
                    @click="handleClick(scope.row.userId,scope.row.username,scope.row.realName,scope.row.roleId)"
                    size="small"
                    type="text"
                  >编辑</el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="resetPass(scope.row.userId,scope.row.username,scope.row.roleName)"
                  >重置密码</el-button>
                </template>
              </el-table-column>
            </el-table>
          </section>
        </template>
      </div>
      <template>
        <footer>
          <div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[5,10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </footer>
      </template>
    </div>

    <!-- 新增角色 -->
    <el-dialog title="新增账号" :visible.sync="dialogVisible" width="50%" @close="handleClose">
      <template>
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAlign"
          class="saveRole"
        >
          <el-form-item label="账号">
            <el-input v-model.trim="formLabelAlign.username"></el-input>
          </el-form-item>
          <el-form-item label="负责人">
            <el-input v-model.trim="formLabelAlign.realName"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model.trim="formLabelAlign.pass" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model.trim="formLabelAlign.surePass" type="password"></el-input>
          </el-form-item>

          <el-form-item label="用户角色">
            <el-select v-model="formLabelAlign.roleId" placeholder="请选择">
              <el-option
                v-for="item in userRoleData"
                :key="item.roleId"
                :label="item.name"
                :value="item.roleId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-top:40px">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="saveSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="编辑账号" :visible.sync="editDialogVisible" width="50%" @close="handleClose">
      <template>
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="editform"
          class="saveRole"
        >
          <el-form-item label="账号">
            <el-input v-model="editform.username"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="editform.realName"></el-input>
          </el-form-item>

          <el-form-item label="用户角色">
            <el-select v-model="editform.roleId" placeholder="请选择">
              <el-option
                v-for="item in userRoleData"
                :key="item.roleId"
                :label="item.name"
                :value="item.roleId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号状态">
            <el-radio-group v-model="editform.status">
              <el-radio label="1">启用</el-radio>
              <el-radio label="-1">停用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item style="margin-top:40px">
            <el-button @click="editDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="editSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-dialog>

    <!-- 重置密码 -->
    <el-dialog title="重置密码" :visible.sync="resetDialogVisible" width="50%" @close="handleClose">
      <template>
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="resetfrom"
          class="saveRole"
        >
          <el-form-item label="用户角色">
            <el-input v-model="resetfrom.roleName" disabled></el-input>
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="resetfrom.username" disabled></el-input>
          </el-form-item>

          <el-form-item label="输入新密码">
            <el-input v-model="resetfrom.pass" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码">
            <el-input v-model="resetfrom.surePass" type="password"></el-input>
          </el-form-item>
          <el-form-item style="margin-top:40px">
            <el-button @click="resetDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="resetSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import service from "@/api";
import { JSEncrypt } from "jsencrypt";
import menusId from "@/mixins/menusId";
export default {
  data() {
    return {
      tableData: [],
      labelPosition: "left",
      formLabelAlign: {
        realName: "",
        username: "",
        pass: "",
        surePass: "",
        roleId: ""
      },
      editform: {
        username: "",
        realName: "",
        roleId: "",
        status: "1",
        userId: ""
      },
      resetfrom: {
        username: "",
        realName: "",
        pass: "",
        surePass: "",
        userId: ""
      },
      total: 0,
      pageSize: 20,
      pageNum: 1,
      dialogVisible: false,
      editDialogVisible: false,
      resetDialogVisible: false,
      userRoleData: []
    };
  },

  mixins: [menusId],

  mounted() {
    this.userList();
  },

  methods: {
    // 新增账号
    onSubmit() {
      this.dialogVisible = true;
      this.rolelist();
    },
    // 获取select角色
    async rolelist(roleId) {
      let res = await service.rolelist({
        pageNum: 1,
        pageSize: 100
      });
      let rolesId = roleId || "";
      if (res.code === 200) {
        this.userRoleData = res.data.list;
        if (rolesId != "") {
          this.editform.roleId = rolesId;
        } else {
          this.formLabelAlign.region = res.data.list[0].rolesId;
        }
      } else {
        this.userRoleData = [];
        this.$message({
          message: res.message,
          type: "warning"
        });
      }
    },

    //  保存新增角色
    saveSubmit() {
      this.addUser();
    },
    async addUser() {
      if (this.formLabelAlign.username === "") {
        this.$message({
          message: "账号不能为空",
          type: "warning"
        });
        return false;
      }
      if (this.formLabelAlign.realName === "") {
        this.$message({
          message: "负责人不能为空",
          type: "warning"
        });
        return false;
      }
      if (
        this.formLabelAlign.pass === "" ||
        this.formLabelAlign.surePass === ""
      ) {
        this.$message({
          message: "请输入密码",
          type: "warning"
        });

        return false;
      }
      if (this.formLabelAlign.pass != this.formLabelAlign.surePass) {
        this.$message({
          message: "密码不一致",
          type: "warning"
        });

        return false;
      }
      // 密码加密
      let publicKey = document.getElementById("publicSrc").value;
      let encryptor = new JSEncrypt(); // 新建JSEncrypt对象
      encryptor.setPublicKey(publicKey); // 设置公钥
      let PassWord = encryptor.encrypt(this.formLabelAlign.pass); // 对密码进行加密
      let data = Object.assign({}, this.formLabelAlign, { password: PassWord });
      let res = await service.addUser(data);
      if (res.code === 200) {
        this.dialogVisible = false;
        this.userList();
      } else {
        this.$message({
          message: res.message,
          type: "warning"
        });
      }
    },

    // 数据调取接口
    async userList() {
      let res = await service.userList({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      });
      if (res.code === 200) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      } else if (res.code === 904) {
        this.tableData = [];
        this.total = 1;
        this.$message({
          message: res.message,
          type: "warning"
        });
      }
    },

    // 点击编辑
    handleClick(userId, username, realName, roleId) {
      this.rolelist(roleId);
      this.editDialogVisible = true;
      this.editform.roleId = roleId;
      this.editform.username = username;
      this.editform.userId = userId;
      this.editform.realName = realName;
    },

    // 编辑保存
    editSubmit() {
      this.userRoleInfo();
    },
    async userRoleInfo() {
      let res = await service.userRoleInfo(this.editform);
      if (res.code === 200) {
        this.editDialogVisible = false;
        this.userList();
      } else {
        this.$message({
          message: res.message,
          type: "warning"
        });
      }
    },

    // 每页的条数
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.userList();
    },

    // 获取当前页
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.userList();
    },

    /// 点击关闭待审核
    handleClose() {},

    // 点击重置密码
    resetPass(userId, username, roleName) {
      this.resetfrom.username = username;
      this.resetfrom.userId = userId;
      this.resetfrom.roleName = roleName;
      this.resetDialogVisible = true;
    },

    // 重置密码提交
    resetSubmit() {
      this.updateRoleInfo();
    },
    async updateRoleInfo() {
      if (this.resetfrom.pass === "" || this.resetfrom.surePass === "") {
        alert("请输入密码");
        return false;
      }
      if (this.resetfrom.pass != this.resetfrom.surePass) {
        alert("密码不一致");
        return false;
      }
      let publicKey = document.getElementById("publicSrc").value;
      let encryptor = new JSEncrypt(); // 新建JSEncrypt对象
      encryptor.setPublicKey(publicKey); // 设置公钥
      let PassWord = encryptor.encrypt(this.resetfrom.pass); // 对密码进行加密
      let data = Object.assign(
        {},
        { userId: this.resetfrom.userId },
        { newPassword: PassWord }
      );

      let res = await service.updateRoleInfo(data);
      if (res.code === 200) {
        this.resetDialogVisible = false;
        this.userList();
      } else {
        this.$message({
          message: res.message,
          type: "warning"
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.helpFul {
  width: 98%;
  height: 100%;
  margin: 0 1%;
  > div {
    width: 100%;
    height: 100%;
    > div {
      width: 100;
      height: 92%;

      header {
        background: #fff;
        display: flex;
        align-items: center;
        border: 1px solid #ebeef5;
        padding-top: 0.15rem;
        padding-bottom: 0.15rem;
        .el-form {
          height: 60%;
          width: 100%;
          padding: 0 0.25rem;
        }
      }
      section {
        width: 100%;
        height: 90%;
        overflow-y: auto;
        margin: 1% 0;
      }
    }
  }

  footer {
    width: 100%;
    height: 8%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border: 1px solid #ebeef5;
    > div {
      margin: 0 0.35rem;
    }
  }
}

.pic_n {
  display: flex;
  align-items: center;
  div {
    width: 240px;
    height: 150px;
    text-align: center;
    margin-right: 0.2rem;
    img {
      width: 100%;
    }
    p {
      margin-top: 0.1rem;
    }
  }
}
.make {
  .el-button {
    text-align: center;
    width: 60px;
    &:nth-of-type(2),
    &:nth-of-type(3) {
      width: 40px;
    }
    &:nth-of-type(4),
    &:nth-of-type(5) {
      width: 80px;
    }
  }
}

aside {
  .avatar {
    display: flex;
    .block {
      margin-right: 0.2rem;
      .el-image {
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
      }
    }
  }
}

.cardId {
  display: flex;
  > div {
    margin-right: 0.2rem;
    .el-image {
      width: 2rem;
      height: 1.3rem;
    }
  }
}

.pic {
  display: flex;

  .el-image {
    width: 1.3rem;
    height: 1.3rem;
    margin-right: 0.2rem;
  }
}
</style>
