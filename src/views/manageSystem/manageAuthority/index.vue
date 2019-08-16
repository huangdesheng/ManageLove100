<style>
</style>
<template>
  <div class="helpFul">
    <div>
      <div>
        <template>
          <header>
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="角色名称">
                <el-input v-model="roleName" placeholder="角色名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchSubmit">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">新增角色</el-button>
              </el-form-item>
            </el-form>
          </header>
        </template>
        <template>
          <section>
            <el-table :data="tableData" border style="width: 100%;text-align:center">
              <el-table-column prop="roleId" label="角色ID" width="80"></el-table-column>
              <el-table-column prop="name" label="角色名称" min-width="120"></el-table-column>
              <el-table-column prop="remark" label="权限管理" min-width="120"></el-table-column>

              <el-table-column label="操作" min-width="120" class="make">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="checkBtn(scope.row.roleId)">编辑</el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="deleteBtn(scope.row.roleId)"
                    style="color:red"
                  >删除</el-button>
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

    <!-- 新增和编辑角色 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="80%"
      @close="handleClose"
      class="welfare"
      :title="title"
    >
      <template>
        <el-form label-position="left" label-width="100px" :model="formLabelAlign">
          <el-form-item label="角色名称">
            <el-input v-model.trim="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              v-model.trim="formLabelAlign.remark"
              :autosize="{ minRows: 4, maxRows: 6}"
            ></el-input>
          </el-form-item>
          <el-form-item label="权限设置">
            <template>
              <el-card class="box-card">
                <!-- <h3>菜单权限</h3> -->
                <div class="text item" v-for="(item,index) in lists" :key="index">
                  <el-row :gutter="24" style="margin-bottom: 5px;margin-top: 5px">
                    <el-col :span="4">
                      <el-checkbox
                        style="margin:0;"
                        false-label="false"
                        true-label="true"
                        v-model="item.bind"
                        @change="checked=>handleCheckAllChange(checked,item.menuVOS,item.parentId)"
                        class="labs"
                      >
                        <b>{{ item.parentName}}</b>
                      </el-checkbox>
                    </el-col>
                    <el-col :span="20">
                      <el-checkbox
                        style="margin-right: 20px;"
                        false-label="false"
                        true-label="true"
                        :key="items.childrenId"
                        v-model="items.bind"
                        v-for="items in item.menuVOS"
                        @change.native="leftSelected(items.bind,items,item.menuVOS,item)"
                        class="labs"
                      >{{ items.childrenName}}</el-checkbox>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm">取消</el-button>
            <el-button type="primary" @click="submitForm">保存</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import service from "@/api";
import qs from "qs";
import menusId from "@/mixins/menusId";
export default {
  data() {
    return {
      roleName: "",
      formLabelAlign: {
        name: "",
        remark: "",
        nodes: [],
        roleId: ""
      },
      item: {
        name: "",
        remark: "",
        nodes: [],
        roleId: ""
      },

      tableData: [],
      total: 0,
      pageSize: 20,
      pageNum: 1,
      dialogVisible: false,
      title: "新增角色",
      ids: [],
      lists: []
    };
  },

  mixins: [menusId],

  mounted() {
    this.rolesList();
  },

  methods: {
    // 全选（checkbox）
    handleCheckAllChange(val, row, parentId) {
      console.log(val);
      console.log(row);
      console.log(parentId);
      if (val == "true") {
        this.ids.push(parentId);
        row.forEach(item => {
          this.$set(item, "bind", true);
          this.ids.push(item.childrenId);
        });
      } else {
        this.ids.splice(this.ids.findIndex(item => item === parentId), 1);
        row.forEach((item, index) => {
          var index = this.ids.indexOf(item.childrenId);
          this.$set(item, "bind", false);
          if (index > -1) {
            this.ids.splice(index, 1);
          }
        });
      }
      let nodes = Array.from(new Set(this.ids));
      this.ids = nodes;
      console.log(this.ids);
    },

    //  子checkBox
    leftSelected(val, row, children, items) {
      if (val == "true") {
        // 如果选择操作，则菜单也因不该可以选择上
        if (row.childrenId === 150) {
          children.forEach(item => {
            if (item.childrenId === 9) {
              this.ids.push(item.childrenId);
              item.bind = true;
            }
          });
        }
        if (row.childrenId === 160) {
          children.forEach(item => {
            if (item.childrenId === 8) {
              this.ids.push(item.childrenId);
              item.bind = true;
            }
          });
        }
        this.ids.push(row.childrenId);
      } else {
        if (row.childrenId === 9) {
          this.ids = this.ids.filter(item => item != 150);
          children.forEach(item => {
            if (item.childrenId === 150) {
              item.bind = false;
            }
          });
        }
        if (row.childrenId === 8) {
          this.ids = this.ids.filter(item => item != 160);
          children.forEach(item => {
            if (item.childrenId === 160) {
              item.bind = false;
            }
          });
        }
        var index = this.ids.indexOf(row.childrenId);
        if (index > -1) {
          this.ids.splice(index, 1);
        }
        row.bind = false;
      }

      // this.ids = nodes;
      // 判断是否全部选中还是部分选中并且给全选checkbox赋值
      let flag = children.some(item => item.bind);
      if (flag) {
        this.ids.push(items.parentId);
        items.bind = true;
      } else {
        if (row.childrenId === 180 || row.childrenId === 170) {
        } else {
          let nodes = this.ids.filter(item => item != items.parentId);
          this.ids = nodes;
          items.bind = false;
        }
      }
      this.ids = Array.from(new Set(this.ids));
      console.log(this.ids);
    },

    // 数据调取接口
    async rolesList(name) {
      name = name || "";
      let res = await service.rolesList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        roleName: name
      });
      if (res.code === 200) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      } else if (res.code === 904) {
        this.tableData = [];
        this.$message({
          message: res.message,
          type: "warning"
        });
      }
    },

    // 查询
    searchSubmit() {
      this.pageNum = 1;
      this.rolesList(this.roleName);
    },

    // 新增栏目
    async onSubmit() {
      this.dialogVisible = true;
      this.formLabelAlign = this.item;
      this.title = "新增角色";
      let res = await service.authorityMenus();
      if (res.code === 200) {
        this.lists = res.data;
      } else {
        this.$message({
          message: res.message,
          type: "warning"
        });
      }
    },
    // 保存和编辑保存
    submitForm() {
      console.log(this.ids);
      this.formLabelAlign.nodes = this.ids;
      if (this.formLabelAlign.name === "") {
        this.$message({
          message: "请输入角色名称",
          type: "warning"
        });
        return false;
      }
      this.addMessage();
    },

    async addMessage() {
      let res;
      if (this.formLabelAlign.roleId == "") {
        res = await service.saveRoles(this.formLabelAlign);
      } else {
        res = await service.editSubmitRoles(this.formLabelAlign);
      }
      if (res.code === 200) {
        this.rolesList();
        this.$message({
          message: res.data.msg
        });
        this.dialogVisible = false;
      } else {
        this.$message({
          message: res.message,
          type: "warning"
        });
      }
    },

    // 取消按钮
    resetForm() {
      this.dialogVisible = false;
    },

    // 点击编辑
    checkBtn(roleId) {
      this.editRoles(roleId);
      this.title = "编辑角色";
    },

    async editRoles(roleId) {
      let res = await service.editRoles(roleId);

      if (res.code === 200) {
        this.ids = [];
        this.formLabelAlign = res.data;
        this.lists = res.data.menuMapVOS;
        this.dialogVisible = true;

        // 处理数组！获取一进来选中的id
        this.lists.forEach(item => {
          if (item.bind) {
            this.ids.push(item.parentId);
          }

          for (var i = 0; i < item.menuVOS.length; i++) {
            if (item.menuVOS[i].bind) {
              this.ids.push(item.menuVOS[i].childrenId);
            }
          }
        });
        console.log(this.ids);
        let nodes = Array.from(new Set(this.ids));
        this.ids = nodes;
        // 处理数组！或者获取自己想要的格式
        var keys = this.lists.map(item => {
          return {
            // bind: item.menuVOS.every(items => {
            //   return items.bind === true;
            // }),
            bind: item.bind,
            parentName: item.parentName,
            menuVOS: item.menuVOS,
            parentId: item.parentId
          };
        });
        this.lists = keys;
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
      this.rolesList();
    },

    // 获取当前页
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.rolesList();
    },

    // 点击关闭待审核
    handleClose() {},

    // 删除角色
    deleteBtn(roleId) {
      this.$confirm("是否删除该项目", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "primary"
      })
        .then(() => {
          this.deleteRoles(roleId);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    async deleteRoles(roleId) {
      let res = await service.deleteRoles(roleId);
      if (res.code === 200) {
        this.rolesList();
        this.$message({
          type: "success",
          message: "删除成功!"
        });
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

.loveValue {
  width: 20px;
  height: 20px;
}

.aside {
  display: flex;
  .showPic {
    width: 150px;
    height: 100px;
    div {
      height: 100%;
      width: 100%;
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
