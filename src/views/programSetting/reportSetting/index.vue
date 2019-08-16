<style>
</style>
<template>
  <div class="helpFul">
    <div>
      <div>
        <template>
          <header>
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="发布时间">
                <el-input v-model="postTime" placeholder="发布时间"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchSubmit">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">新增栏目</el-button>
              </el-form-item>
            </el-form>
          </header>
        </template>
        <template>
          <section>
            <el-table
              :data="tableData"
              border
              style="width: 100%;text-align:center"
              @select="handleChange"
              ref="table"
            >
              <el-table-column type="selection" width="80"></el-table-column>
              <el-table-column type="index" label="序号" width="80"></el-table-column>
              <el-table-column prop="content" label="推送内容" min-width="200"></el-table-column>
              <el-table-column prop="postTime" label="发布时间" min-width="120"></el-table-column>
              <el-table-column label="发布状态" min-width="120" class="make">
                <template slot-scope="scope">
                  <span v-if="scope.row.state === 0">发布中</span>
                  <span v-else>发布结束</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="100" class="make">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="checkBtn(scope.row.messageId)">编辑</el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="deleteBtn(scope.row.messageId)"
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

    <el-dialog
      :visible.sync="dialogVisible"
      width="80%"
      @close="handleClose"
      class="welfare"
      :title="title"
    >
      <template>
        <el-form label-position="left" label-width="100px" :model="formLabelAlign">
          <el-form-item label="消息推送">
            <el-input
              type="textarea"
              v-model.trim="formLabelAlign.content"
              :autosize="{ minRows: 6, maxRows: 10}"
            ></el-input>
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
      postTime: "",
      formLabelAlign: {
        messageId: "",
        content: ""
      },
      item: {
        messageId: "",
        content: ""
      },
      tableData: [],
      total: 0,
      pageSize: 20,
      pageNum: 1,
      dialogVisible: false,
      title: "消息新增"
    };
  },

  mixins: [menusId],

  mounted() {
    this.messageList();
  },

  methods: {
    // 推送列表
    async messageList(postTime) {
      postTime = postTime || "";
      let res = await service.messageList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        postTime: postTime
      });
      if (res.code === 200) {
        this.tableData = res.data.list;
        this.total = res.data.total;
        var selection = this.tableData.filter(item => item.state === 0);
        this.$nextTick(() => {
          for (var i = 0; i < selection.length; i++) {
            this.$refs.table.toggleRowSelection(selection[i], true);
          }
        });
      } else if (res.code === 904) {
        this.tableData = [];
        this.total = 1;
        this.$message({
          message: res.message,
          type: "warning"
        });
      }
    },

    // 取消
    resetForm() {
      this.dialogVisible = false;
    },

    // 查询
    searchSubmit() {
      this.pageNum = 1;
      this.messageList(this.postTime);
    },

    // 新增栏目
    onSubmit() {
      this.dialogVisible = true;
      this.formLabelAlign = this.item;
      this.title = "消息新增";
    },

    // 点击编辑
    checkBtn(messageId) {
      this.messageDetails(messageId);
      this.title = "消息修改";
    },
    async messageDetails(messageId) {
      let res = await service.messageDetails(messageId);
      if (res.code === 200) {
        this.formLabelAlign = res.data;
        this.dialogVisible = true;
      } else {
        this.$message({
          type: "warning",
          message: res.message
        });
      }
    },

    // 保存和编辑保存
    submitForm() {
      if (
        this.formLabelAlign.content === "" ||
        this.formLabelAlign.content == null
      ) {
        this.$message({
          message: "请填写推送消息",
          type: "warning"
        });
        return false;
      }
      this.addMessage();
    },
    async addMessage() {
      let res;
      if (this.formLabelAlign.messageId === "") {
        res = await service.addMessage({
          content: this.formLabelAlign.content
        });
      } else {
        res = await service.updateMessage(this.formLabelAlign);
      }

      if (res.code === 200) {
        this.messageList();
        this.$message({
          message: res.data.msg,
          type: "success"
        });
        this.dialogVisible = false;
      } else {
        this.$message({
          type: "warning",
          message: res.message
        });
      }
    },

    // 每页的条数
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.messageList();
    },

    // 获取当前页
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.messageList();
    },

    /// 点击关闭待审核
    handleClose() {},

    // 选择消息推送
    handleChange(selection, row) {
      this.$refs.table.clearSelection();
      this.$refs.table.toggleRowSelection(row);
      this.release(row.messageId, selection);
    },
    async release(messageId, selection) {
      let res = await service.release(
        qs.stringify({
          messageId: messageId
        })
      );
      if (res.code === 200) {
        this.messageList();
      } else {
        this.$message({
          type: "warning",
          message: res.message
        });
        this.$refs.table.toggleRowSelection(selection.pop());
      }
    },

    // 删除项目
    deleteBtn(messageId) {
      this.$confirm("是否删除该项目", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "primary"
      })
        .then(() => {
          this.deleteMessage(messageId);
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消删除"
          });
        });
    },
    async deleteMessage(messageId) {
      let res = await service.deleteMessage(
        qs.stringify({
          messageId: messageId
        })
      );
      if (res.code === 200) {
        this.messageList();
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
