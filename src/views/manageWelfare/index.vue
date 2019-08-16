<style>
</style>
<template>
  <div class="helpFul">
    <div>
      <div>
        <template>
          <header>
            <el-form :inline="true" v-model="formInline" class="demo-form-inline">
              <el-form-item label="项目名称">
                <el-input v-model="formInline.name" placeholder="项目名称"></el-input>
              </el-form-item>

              <el-form-item label="筹款状态">
                <el-select
                  v-model="formInline.payNumber"
                  placeholder="全部"
                  @change="changePayStatus"
                >
                  <el-option
                    v-for="(item,index) in saveStatus"
                    :key="index"
                    :label="item.payName"
                    :value="item.payNumber"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button
                  type="primary"
                  @click="addSubmit"
                  v-if="list.indexOf('170') != -1 || list.indexOf(170) != -1"
                >新增</el-button>
              </el-form-item>
            </el-form>
          </header>
        </template>
        <template>
          <section>
            <el-table :data="tableData" border style="width: 100%;text-align:center">
              <el-table-column type="index" label="序号" width="80"></el-table-column>
              <el-table-column prop="title" label="项目名称" min-width="120"></el-table-column>
              <el-table-column prop="targetAmount" label="目标筹款(元)" min-width="120"></el-table-column>
              <el-table-column prop="currentAmount" label="当前筹款(元)" min-width="120"></el-table-column>
              <el-table-column prop="releaseTime" label="筹款时间" min-width="120"></el-table-column>
              <el-table-column prop="status" label="募款状态" min-width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 0">筹款中</span>
                  <span v-else-if="scope.row.status === 1">已结束</span>
                  <span v-else>未发布</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                min-width="250"
                class="make"
                v-if="list.indexOf('170') != -1 || list.indexOf(170) != -1"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    v-if="scope.row.status == 0"
                    @click="endProject(scope.row.projectId)"
                    style
                  >结束筹款</el-button>
                  <el-button type="text" v-else-if="scope.row.status == 1">已结束</el-button>
                  <el-button type="text" v-else @click="startWelfare(scope.row.projectId)">发布</el-button>
                  <el-button type="text" size="small" @click="editBtn(scope.row.projectId)">编辑</el-button>
                  <el-button
                    type="text"
                    size="small"
                    style="color:red"
                    @click="deleteProject(scope.row.projectId)"
                  >删除</el-button>
                  <el-button type="text" size="small">提交项目进展</el-button>
                  <el-button type="text" size="small">提交财务披露</el-button>
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
      class="welfare comom"
      :title="title"
    >
      <template>
        <el-form label-position="left" label-width="100px" :model="formLabelAlign">
          <el-form-item label="项目名称">
            <el-input v-model.trim="formLabelAlign.title"></el-input>
          </el-form-item>
          <el-form-item label="筹款金额(元)">
            <el-input v-model.trim="formLabelAlign.targetAmount"></el-input>
          </el-form-item>
          <el-form-item label="项目介绍" prop="desc">
            <el-input type="textarea" v-model.trim="formLabelAlign.introduce" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="项目图片">
            <div class="upload">
              <div class="show">
                <li v-for="(item,index) in formLabelAlign.imgs" :key="index">
                  <div
                    class="img"
                    :style="{backgroundImage: 'url(' + item + ')', backgroundSize:'cover'}"
                    @click="imgUrl(item)"
                  ></div>
                  <div class="delete" @click="deleteImg(index,item)">
                    <i class="el-icon-close"></i>
                  </div>
                </li>
              </div>

              <div class="add">
                <input @change="fileChange($event)" type="file" id="upload_file" multiple />
                <div>
                  <i class="el-icon-plus"></i>
                </div>
              </div>
            </div>
            <p>（注明：最多上传三张,第一张作为项目主图）</p>
          </el-form-item>

          <el-form-item label="项目预算" prop="desc">
            <el-input type="textarea" v-model.trim="formLabelAlign.projectBudget" :rows="3.5"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="upload">
              <div class="show">
                <li v-if="formLabelAlign.budgetPhoto !=''">
                  <div
                    class="img"
                    :style="{backgroundImage: 'url(' + formLabelAlign.budgetPhoto + ')', backgroundSize:'cover'}"
                    @click="imgUrl(formLabelAlign.budgetPhoto)"
                  ></div>
                </li>
              </div>

              <div class="add">
                <input @change="singleFileChange($event)" type="file" id="upload_file" multiple />
                <div>
                  <i class="el-icon-plus"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="管理费说明" prop="desc">
            <el-input type="textarea" v-model.trim="formLabelAlign.explain" :rows="3.5"></el-input>
          </el-form-item>
          <el-form-item label="执行计划" prop="desc">
            <el-input type="textarea" v-model.trim="formLabelAlign.implementation" :rows="3.5"></el-input>
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
      formInline: {
        payNumber: "-1",
        name: ""
      },

      formLabelAlign: {
        name: "",
        region: "",
        type: "",
        explain: "", //管理费说明
        imgs: [],
        title: "",
        implementation: "",
        introduce: "",
        projectBudget: "",
        targetAmount: "",
        budgetPhoto: ""
      },

      formLabelAlignOne: {
        name: "",
        region: "",
        type: "",
        explain: "", //管理费说明
        imgs: [],
        title: "",
        implementation: "",
        introduce: "",
        projectBudget: "",
        targetAmount: "",
        budgetPhoto: ""
      },

      saveStatus: [
        {
          payName: "全部",
          payNumber: "-1"
        },
        {
          payName: "未发布",
          payNumber: "2"
        },
        {
          payName: "筹款中",
          payNumber: "0"
        },
        {
          payName: "已结束",
          payNumber: "1"
        }
      ],
      tableData: [],
      checkData: [],
      total: 0,
      pageSize: 20,
      pageNum: 1,
      dialogVisible: false,
      icon: require("../../assets/selectedLove.png"),
      no_icon: require("../../assets/select.png"),
      imageUrl: "",
      dialogVisiblePic: false,
      dialogImageUrl: "",
      disabled: false,
      title: ""
    };
  },

  mixins: [preview, menusId],

  mounted() {
    this.welfareList();
  },

  computed: {
    list() {
      return this.$store.state.menusLists;
    }
  },

  methods: {
    // 点击查询
    onSubmit() {
      this.pageNum = 1;
      this.welfareList(this.formInline.name);
    },

    addSubmit() {
      this.title = "新增公益";
      this.dialogVisible = true;
      this.formLabelAlign = this.formLabelAlignOne;
    },

    resetForm() {
      this.dialogVisible = false;
    },

    // 图片上传
    fileChange(file) {
      this.moreUpload(file);
    },
    async moreUpload(content) {
      var fileLength = Array.from(content.target.files);
      var formData = new FormData();
      if (
        fileLength.length > 3 ||
        this.formLabelAlign.imgs.length > 2 ||
        this.formLabelAlign.imgs.length + fileLength.length > 3
      ) {
        alert("超过上传数量");

        return false;
      }
      for (var i = 0; i < fileLength.length; i++) {
        var file = fileLength[i];
        formData.append("files", file);
      }
      let config = {
        "Content-Type": "multipart/form-data"
      };
      let res = await service.moreUploadTwo(formData, config);
      if (res.code === 200) {
        document.getElementById("upload_file").value = "";
        let imgs = [];
        res.data.forEach(element => {
          imgs.push(element.photoUrl);
        });
        this.formLabelAlign.imgs = [...this.formLabelAlign.imgs, ...imgs];
      }
    },

    async singleFileChange(content) {
      var formData = new FormData();
      formData.append("file", content.srcElement.files[0]);
      let config = {
        "Content-Type": "multipart/form-data"
      };
      let res = await service.singleUpload(formData, config);
      if (res.code === 200) {
        this.formLabelAlign.budgetPhoto = res.data.photoUrl;
      } else {
        this.$message({
          message: res.message,
          type: "warning"
        });
      }
    },

    // 删除图片
    deleteImg(index, item) {
      this.deletePic(index, item);
    },
    async deletePic(index, item) {
      let res = await service.deletePic({
        obj: item
      });
      if (res.code === 200) {
        this.$message({
          message: "删除图片成功"
        });
        this.formLabelAlign.imgs.splice(index, 1);
        document.getElementById("upload_file").value = "";
      }
    },

    submitForm() {
      if (
        this.formLabelAlign.title === "" ||
        this.formLabelAlign.title === null
      ) {
        this.$message({
          type: "warning",
          message: "项目名称不能为空"
        });
        return false;
      }
      if (
        this.formLabelAlign.targetAmount === "" ||
        this.formLabelAlign.targetAmount === null
      ) {
        this.$message({
          type: "warning",
          message: "目标金额不能为空"
        });
        return false;
      }
      if (
        this.formLabelAlign.introduce === "" ||
        this.formLabelAlign.introduce === null
      ) {
        this.$message({
          type: "warning",
          message: "活动形式不能为空"
        });
        return false;
      }
      if (this.formLabelAlign.imgs.length === 0) {
        this.$message({
          type: "warning",
          message: "项目图片不能为空"
        });
        return false;
      }
      if (
        this.formLabelAlign.projectBudget === "" ||
        this.formLabelAlign.projectBudget === null
      ) {
        this.$message({
          type: "warning",
          message: "项目预算不能为空"
        });
        return false;
      }
      if (
        this.formLabelAlign.explain === "" ||
        this.formLabelAlign.explain === null
      ) {
        this.$message({
          type: "warning",
          message: "管理费说明不能为空"
        });
        return false;
      }
      if (
        this.formLabelAlign.implementation === "" ||
        this.formLabelAlign.implementation === null
      ) {
        this.$message({
          type: "warning",
          message: "执行计划不能为空"
        });
        return false;
      }
      if (this.formLabelAlign.projectId != undefined) {
        this.editWelfare(this.formLabelAlign); //编辑
      } else {
        this.addWelfare(this.formLabelAlign); //新增
      }
    },

    async addWelfare() {
      let res = await service.addWelfare(this.formLabelAlign);
      if (res.code === 200) {
        this.$message({
          type: "success",
          message: "添加成功"
        });
        this.dialogVisible = false;
        this.welfareList();
      } else {
        this.$message({
          type: "warning",
          message: res.message
        });
      }
    },
    async editWelfare() {
      let res = await service.editWelfare(this.formLabelAlign);
      if (res.code === 200) {
        this.$message({
          type: "success",
          message: "添加成功"
        });
        this.dialogVisible = false;
        this.welfareList();
      } else {
        this.$message({
          type: "warning",
          message: res.message
        });
      }
    },

    // 发布项目
    startWelfare(projectId) {
      this.releaseWelfare(projectId);
    },
    async releaseWelfare(projectId) {
      let res = await service.releaseWelfare(
        qs.stringify({
          projectId: projectId
        })
      );
      if (res.code === 200) {
        this.$message({
          type: "success",
          message: "发布成功"
        });
        this.welfareList();
      } else {
        this.$message({
          type: "warning",
          message: res.message
        });
      }
    },

    // 删除项目
    deleteProject(projectId) {
      this.showMessage(projectId, "delete");
    },
    async showMessage(projectId, status) {
      let title;
      if (status === "end") {
        title = "是否结束筹款";
      } else if (status === "delete") {
        title = "是否删除该项目";
      }

      this.$confirm(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          if (status === "end") {
            this.endWelfare(projectId);
          } else if (status === "delete") {
            this.deleteData(projectId);
          }
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消"
          });
        });
    },
    async deleteData(projectId) {
      let res = await service.deleteWelfare(
        qs.stringify({
          projectId: projectId
        })
      );
      if (res.code === 200) {
        this.welfareList();
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      } else {
        this.$message({
          type: "success",
          message: res.message
        });
      }
    },

    // 结束筹款

    endProject(projectId) {
      this.showMessage(projectId, "end");
    },

    async endWelfare(projectId) {
      let res = await service.endWelfare(
        qs.stringify({
          projectId: projectId
        })
      );
      if (res.code === 200) {
        this.welfareList();
        this.$message({
          type: "success",
          message: "结束筹款!"
        });
      } else {
        this.$message({
          type: "warning",
          message: res.message
        });
      }
    },

    // 选择项目状态
    changePayStatus() {
      this.pageNum = 1;
      this.welfareList();
    },
    // 编辑
    editBtn(projectId) {
      this.title = "修改公益";
      this.welfareDetails(projectId);
    },

    async welfareDetails(projectId) {
      let res = await service.welfareDetails(projectId);
      if (res.code === 200) {
        this.dialogVisible = true;
        this.formLabelAlign = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.message
        });
      }
    },

    handlePictureCardPreview(file) {
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisiblePic = true;
    },

    // 数据调取接口
    async welfareList(name) {
      name = name || "";
      let res = await service.welfareList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        status: this.formInline.payNumber,
        title: name
      });
      console.log(res);
      if (res.code === 200) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      } else if (res.code === 904) {
        this.tableData = [];
        this.total = 1;
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
      this.welfareList();
    },

    // 获取当前页
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.welfareList();
    },

    /// 点击关闭待审核
    handleClose() {}
  }
};
</script>

<style lang="less" scoped>
.helpFul {
  width: 98%;
  height: 94%;
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

.PicShow {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    border: 30px solid #fff;
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
</style>
