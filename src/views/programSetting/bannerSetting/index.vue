<style>
</style>
<template>
  <div class="helpFul">
    <div>
      <div>
        <template>
          <header>
            <el-form :inline="true" class="demo-form-inline" style="text-align:right">
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
              <el-table-column prop="title" label="项目标题" min-width="120"></el-table-column>
              <el-table-column prop="postTime" label="添加时间" min-width="120"></el-table-column>

              <el-table-column label="操作" min-width="120" class="make">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="checkBtn(scope.row.bannerId)">编辑</el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="deleteBtn(scope.row.bannerId)"
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

    <!-- 新增和编辑banner -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="80%"
      @close="handleClose"
      class="welfare"
      :title="title"
    >
      <template>
        <el-form label-position="left" label-width="100px" :model="formLabelAlign">
          <!-- <el-form-item label="URL">
            <el-input v-model.trim="formLabelAlign.url"></el-input>
            <span>/helpProgram/programDetails</span>
          </el-form-item>
          <el-form-item label="项目ID">
            <el-input v-model.number="formLabelAlign.projectId"></el-input>
          </el-form-item>-->

          <el-form-item label="页面跳转" class="urlPage">
            <el-select v-model="formLabelAlign.jumpType" @change="selectUrl">
              <el-option label="团体帮扶详情" value="1"></el-option>
              <el-option label="公益详情" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目名称" class="urlPage">
            <template>
              <el-select v-model="formLabelAlign.jumpId" placeholder="选择项目名称" @change="selectName">
                <el-option
                  v-for="item in projectName"
                  :key="item.projectId"
                  :label="item.title"
                  :value="item.projectId"
                ></el-option>
              </el-select>
            </template>
          </el-form-item>

          <el-form-item label="项目图片">
            <div class="upload">
              <div class="show" v-show="formLabelAlign.imgUrl !=''">
                <li>
                  <div
                    class="img"
                    @click="imgUrl(formLabelAlign.imgUrl)"
                    :style="{backgroundImage: 'url(' + formLabelAlign.imgUrl + ')', backgroundSize:'cover'}"
                  ></div>
                </li>
              </div>

              <div class="add">
                <input @change="fileChange($event)" type="file" id="upload_file" />
                <div>
                  <i class="el-icon-plus"></i>
                </div>
              </div>
            </div>
            <p>（注明：图片比例2(长) : 1(宽)）</p>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm">取消</el-button>
            <el-button type="primary" @click="submitForm">保存</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-dialog>

    <div class="bigImg" v-show="imgStatus" @click="bigImg">
      <div>
        <img :src="imgurl" />
      </div>
    </div>
  </div>
</template>

<script>
import service from "@/api";
import qs from "qs";
import preview from "@/mixins/preview";
import menusId from "@/mixins/menusId";
export default {
  data() {
    return {
      // form: {
      //   status: "1"
      // },
      formLabelAlign: {
        imgUrl: "",
        jumpId: "",
        bannerId: "",
        jumpType: "1",
        title: ""
      },
      item: {
        imgUrl: "",
        jumpId: "",
        bannerId: "",
        jumpType: "1",
        title: ""
      },
      tableData: [],
      total: 0,
      pageSize: 20,
      pageNum: 1,
      dialogVisible: false,
      title: "",
      projectName: []
    };
  },
  mixins: [preview, menusId],
  mounted() {
    this.bannerList();
  },

  methods: {
    selectUrl(value, label) {
      if (value == 1) {
        this.groupsList();
      } else if (value == 2) {
        this.welfareList();
      }
    },

    selectName(value) {
      console.log(value);
      let label = this.projectName.filter(item => item.projectId === value);
      this.formLabelAlign.title = label[0].title;
    },

    async groupsList() {
      let res = await service.groups({
        pageNum: 1,
        pageSize: 1000,
        auditStatus: ""
      });

      if (res.code === 200) {
        if (
          this.formLabelAlign.jumpId == "" ||
          this.formLabelAlign.jumpType == 1
        ) {
          this.formLabelAlign.jumpId = res.data.list[0].projectId.toString();
          this.formLabelAlign.title = res.data.list[0].title;
        }
        let list = res.data.list.map(item => {
          return { title: item.title, projectId: item.projectId.toString() };
        });
        console.log(list);
        this.projectName = list;
      } else if (res.code === 904) {
        console.log(2);
        this.formLabelAlign.jumpId = "";
        this.projectName = [];
      }
    },

    async welfareList() {
      let res = await service.welfareList({
        pageNum: 1,
        pageSize: 1000,
        status: "-1"
      });

      if (res.code === 200) {
        if (
          this.formLabelAlign.jumpId == "" ||
          this.formLabelAlign.jumpType == 2
        ) {
          this.formLabelAlign.jumpId = res.data.list[0].projectId.toString();
          this.formLabelAlign.title = res.data.list[0].title;
        }
        let list = res.data.list.map(item => {
          return { title: item.title, projectId: item.projectId.toString() };
        });
        this.projectName = list;
      } else if (res.code === 904) {
        console.log(1);
        this.formLabelAlign.jumpId = "";
        this.projectName = [];
      }
    },
    // 数据调取接口
    async bannerList() {
      let res = await service.bannerList({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      });
      if (res.code === 200) {
        this.tableData = res.data.list;
        this.total = res.data.total;
        var selection = this.tableData.filter(item => item.state === 1);
        this.$nextTick(() => {
          for (var i = 0; i < selection.length; i++) {
            this.$refs.table.toggleRowSelection(selection[i], true);
          }
        });
      } else if (res.code === 904) {
        this.tableData = [];
        this.total = 1;
      } else {
        this.$message({
          message: res.message,
          type: "warning"
        });
      }
    },

    // 新增栏目
    onSubmit() {
      this.title = "新增Banner";
      this.formLabelAlign.jumpId = "";
      this.formLabelAlign.bannerId = "";
      this.formLabelAlign.jumpType = "1";
      this.formLabelAlign.title = "";
      this.formLabelAlign.imgUrl = "";
      this.dialogVisible = true;
      this.groupsList();
    },
    // 保存和编辑保存
    submitForm() {
      this.addBanner();
    },
    async addBanner() {
      let res;
      if (this.formLabelAlign.bannerId === "") {
        res = await service.addBanner(this.formLabelAlign);
      } else {
        res = await service.updateBanner(this.formLabelAlign);
      }
      if (res.code === 200) {
        this.bannerList();
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

    // 取消保存
    resetForm() {
      this.dialogVisible = false;
    },

    // 点击编辑
    checkBtn(bannerId) {
      this.BannerDetails(bannerId);
      this.title = "编辑Banner";
    },
    async BannerDetails(bannerId) {
      let res = await service.BannerDetails(bannerId);
      if (res.code === 200) {
        this.formLabelAlign = res.data;
        this.formLabelAlign.jumpType = res.data.jumpType.toString();
        this.formLabelAlign.jumpId = res.data.jumpId.toString();
        if (this.formLabelAlign.jumpType == "1") {
          this.groupsList();
        } else {
          this.welfareList();
        }
        console.log(this.formLabelAlign);
        this.dialogVisible = true;
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
      this.bannerList();
    },

    // 获取当前页
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.bannerList();
    },

    /// 点击关闭待审核
    handleClose() {},

    // 图片上传
    fileChange(file) {
      this.singleUpload(file);
    },
    async singleUpload(content) {
      console.log(content);
      var formData = new FormData();
      formData.append("file", content.srcElement.files[0]);
      let config = {
        "Content-Type": "multipart/form-data"
      };
      let res = await service.singleUpload(formData, config);
      if (res.code === 200) {
        this.formLabelAlign.imgUrl = res.data.photoUrl;
      } else {
        this.$message({
          message: res.message,
          type: "warning"
        });
      }
    },

    // 选择banner
    handleChange(selection, row) {
      this.exhibition(row.bannerId, selection);
    },

    async exhibition(bannerId, selection) {
      let res = await service.exhibition(
        qs.stringify({
          bannerId: bannerId
        })
      );

      console.log(selection);

      if (res.code === 200) {
        this.bannerList();
      } else {
        this.$message({
          message: res.message,
          type: "warning"
        });
        this.$refs.table.toggleRowSelection(
          this.$refs.table.tableData[3],
          false
        );
      }
    },

    // 删除banner项目
    deleteBtn(bannerId) {
      this.$confirm("是否删除该项目", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "primary"
      })
        .then(() => {
          this.deleteBanner(bannerId);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async deleteBanner(bannerId) {
      let res = await service.deleteBanner(
        qs.stringify({
          bannerId: bannerId
        })
      );
      if (res.code === 200) {
        this.bannerList();
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

th .el-checkbox {
  display: none;
}
</style>
