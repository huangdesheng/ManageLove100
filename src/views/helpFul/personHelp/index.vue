<style>
</style>
<template>
  <div class="helpFul">
    <!-- 内容 -->
    <div>
      <div>
        <template>
          <header>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="项目状态">
                <el-select
                  v-model="formInline.region"
                  clearable
                  placeholder="项目状态"
                  @change="changeStatus"
                >
                  <el-option label="待审核" value="0"></el-option>
                  <el-option label="不通过" value="2"></el-option>
                  <el-option label="通过" value="1"></el-option>
                  <el-option label="全部" value></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发起人身份证号码">
                <el-input v-model="formInline.cardId" placeholder="发起人身份证号码"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </header>
        </template>
        <template>
          <section>
            <el-table :data="tableData" border style="width: 100%;text-align:center">
              <el-table-column type="index" label="序号" width="80"></el-table-column>
              <el-table-column prop="username" label="发起人" min-width="120"></el-table-column>
              <el-table-column prop="cardId" label="发起人身份证" min-width="120"></el-table-column>
              <el-table-column prop="recipientsName" label="受助人" min-width="120">
                <template slot-scope="scope">
                  <el-button
                    @click="detailsInfo(scope.row.projectId,1)"
                    size="small"
                    type="text"
                  >{{scope.row.recipientsName}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="postTime" label="申请时间" min-width="120"></el-table-column>
              <el-table-column prop="auditStatus" label="审核状态" min-width="120">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.auditStatus === 0"
                    @click="checking(scope.row.projectId)"
                    type="text"
                    size="small"
                  >审核中</el-button>
                  <el-button
                    v-else-if="scope.row.auditStatus === 1"
                    @click="checking(scope.row.projectId)"
                    type="text"
                    size="small"
                  >通过</el-button>
                  <el-button
                    v-else
                    style="color:red"
                    @click="checking(scope.row.projectId)"
                    type="text"
                    size="small"
                  >审核不通过</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="auditTime" label="审核时间" min-width="120"></el-table-column>
              <el-table-column
                label="操作"
                min-width="120"
                v-if="list.indexOf('150') != -1 || list.indexOf(150) != -1"
              >
                <template slot-scope="scope">
                  <el-button
                    @click="handleClick(scope.row.projectId)"
                    size="small"
                    v-if="scope.row.auditStatus === 0"
                    type="text"
                  >审核</el-button>
                  <el-button
                    type="text"
                    size="small"
                    v-else-if="scope.row.auditStatus === 1"
                    @click="recommend(scope.row.projectId)"
                  >推荐</el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="personalDelete(scope.row.projectId)"
                  >临时删除</el-button>
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
    <!-- 受助人详情（审核） -->
    <el-dialog
      :visible.sync="personDetails"
      width="85%"
      @close="handleClose"
      class="details personal comom"
      title="项目详情"
    >
      <template v-if="checkdetailsData !=''">
        <aside class="aside">
          <el-row>
            <el-col>
              <div class="grid-content bg-purple">受助人头像:</div>
            </el-col>
            <el-col class="avatar">
              <div class="block">
                <el-image
                  :src="checkdetailsData.photo"
                  fit="cover"
                  @click="imgUrl(checkdetailsData.photo)"
                ></el-image>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <div class="grid-content bg-purple">姓名:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">{{checkdetailsData.name}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="grid-content bg-purple">性别:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">{{checkdetailsData.sex === 1 ? '男': '女'}}</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <div class="grid-content bg-purple">年龄:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">{{checkdetailsData.age}}岁</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <div class="grid-content bg-purple">年级:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">{{checkdetailsData.classNumber}}年级</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="grid-content bg-purple">身份证号:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">{{checkdetailsData.cardId}}</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <div class="grid-content bg-purple">爱心状况:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">
                <template>
                  <span
                    v-for="(items,index) in Array.from(
          { length: checkdetailsData.loveValue },
          (v, k) => k
        )"
                    :key="index"
                  >
                    <img :src="icon" alt class="loveValue" />
                  </span>
                  <span>
                    <img
                      v-for="(items,index) in Array.from(
          { length: checkdetailsData.totalPeriods - checkdetailsData.loveValue},
          (v, k) => k
        )"
                      :key="index"
                      :src="no_icon"
                      alt
                      class="loveValue"
                    />
                  </span>
                </template>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="grid-content bg-purple">地区:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">{{checkdetailsData.address}}</div>
            </el-col>
          </el-row>
          <div class="info">
            <div>
              <el-row>
                <el-col>
                  <div class="grid-content bg-purple">身份/户口本照片：</div>
                </el-col>
                <!-- <span>checkdetailsData.photos[0]</span> -->
                <el-col class="cardId" v-if="checkdetailsData.photos[0] !=undefined">
                  <div>
                    <el-image
                      :src="checkdetailsData.photos[0].urls[0]"
                      fit="cover"
                      @click="imgUrl(checkdetailsData.photos[0].urls[0])"
                    ></el-image>
                  </div>
                  <div>
                    <el-image
                      :src="checkdetailsData.photos[0].urls[1]"
                      fit="cover"
                      @click="imgUrl(checkdetailsData.photos[0].urls[1])"
                    ></el-image>
                  </div>
                </el-col>
              </el-row>
              <!-- <span v-else>21321321321</span> -->
              <el-row>
                <el-col>
                  <div class="grid-content bg-purple">家庭状况：</div>
                </el-col>
                <el-col>
                  <div style="width:60%;">{{checkdetailsData.family}}</div>
                  <div
                    style="display:flex;margin-top:0.2rem"
                    class="pic"
                    v-if="checkdetailsData.photos.filter(item => item.type === 2).length > 0"
                  >
                    <el-image
                      v-for="(item,index) in checkdetailsData.photos.filter(item => item.type === 2)[0].urls"
                      :key="index"
                      :src="item"
                      fit="cover"
                      @click="imgUrl(item)"
                    ></el-image>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <div class="grid-content bg-purple">学习情况：</div>
                </el-col>
                <el-col>
                  <div style="width:60%;">{{checkdetailsData.learn}}</div>
                  <div
                    style="display:flex;margin-top:0.2rem"
                    class="pic"
                    v-if="checkdetailsData.photos.filter(item => item.type === 3).length > 0"
                  >
                    <el-image
                      v-for="(item,index) in checkdetailsData.photos.filter(item => item.type === 3)[0].urls"
                      :key="index"
                      :src="item"
                      fit="cover"
                      @click="imgUrl(item)"
                    ></el-image>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>

          <el-row>
            <el-col>
              <div class="grid-content bg-purple">是否通过:</div>
            </el-col>
            <el-col>
              <el-radio-group v-model="item.auditStatus">
                <el-radio :label="1">通过</el-radio>
                <el-radio :label="2">不通过</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <div class="grid-content bg-purple">审核意见:</div>
            </el-col>
            <el-col>
              <el-input
                style="width:30%;"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 8}"
                placeholder="请输入内容"
                v-model.trim="item.auditDesc"
              ></el-input>
            </el-col>
          </el-row>

          <el-row class="btn" style="display:flex;justify-content:center;margin-top:0.6rem">
            <el-button style="margin-right:0.6rem" @click="personDetails =false">取消</el-button>
            <el-button type="primary" @click="submit">确定</el-button>
          </el-row>
        </aside>
      </template>
    </el-dialog>

    <!-- 受助人详情（查看） -->
    <el-dialog
      :visible.sync="checkPersonDetails"
      width="85%"
      @close="handleClose"
      class="details personal"
      title="项目详情"
    >
      <template v-if="checkdetailsData != ''">
        <aside class="aside">
          <el-row>
            <el-col>
              <div class="grid-content bg-purple">受助人头像:</div>
            </el-col>
            <el-col class="avatar">
              <div class="block">
                <el-image
                  :src="checkdetailsData.photo"
                  fit="cover"
                  @click="imgUrl(checkdetailsData.photo)"
                ></el-image>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <div class="grid-content bg-purple">姓名:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">{{checkdetailsData.name}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="grid-content bg-purple">性别:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">{{checkdetailsData.sex === 1 ? '男': '女'}}</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <div class="grid-content bg-purple">年龄:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">{{checkdetailsData.age}}岁</div>
            </el-col>
          </el-row>

          <!-- <el-row>
            <el-col>
              <div class="grid-content bg-purple">受助人信息:</div>
            </el-col>
            <el-col :span="1" style="text-align:left">
              <div class="grid-content bg-purple-light">{{checkdetailsData.name}}</div>
            </el-col>
            <el-col :span="1" style="text-align:left">
              <div class="grid-content bg-purple-light">{{checkdetailsData.sex === 1 ? '男': '女'}}</div>
            </el-col>
            <el-col :span="1" style="text-align:left">
              <div class="grid-content bg-purple-light">{{checkdetailsData.age}}岁</div>
            </el-col>
          </el-row>-->
          <el-row>
            <el-col>
              <div class="grid-content bg-purple">年级:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">{{checkdetailsData.classNumber}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="grid-content bg-purple">身份证号:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">{{checkdetailsData.cardId}}</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <div class="grid-content bg-purple">爱心状况:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">
                <template>
                  <span
                    v-for="(items,index) in Array.from(
          { length: checkdetailsData.loveValue },
          (v, k) => k
        )"
                    :key="index"
                  >
                    <img :src="icon" alt class="loveValue" />
                  </span>
                  <span>
                    <img
                      v-for="(items,index) in Array.from(
          { length: checkdetailsData.totalPeriods - checkdetailsData.loveValue},
          (v, k) => k
        )"
                      :key="index"
                      :src="no_icon"
                      alt
                      class="loveValue"
                    />
                  </span>
                </template>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="grid-content bg-purple">地区:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">{{checkdetailsData.address}}</div>
            </el-col>
          </el-row>
          <div class="info">
            <div>
              <el-row>
                <el-col>
                  <div class="grid-content bg-purple">身份/户口本照片：</div>
                </el-col>
                <!-- <span>checkdetailsData.photos[0]</span> -->
                <el-col class="cardId" v-if="checkdetailsData.photos[0] !=undefined">
                  <div>
                    <el-image
                      :src="checkdetailsData.photos[0].urls[0]"
                      fit="cover"
                      @click="imgUrl(checkdetailsData.photos[0].urls[0])"
                    ></el-image>
                  </div>
                  <div>
                    <el-image
                      :src="checkdetailsData.photos[0].urls[1]"
                      fit="cover"
                      @click="imgUrl(checkdetailsData.photos[0].urls[1])"
                    ></el-image>
                  </div>
                </el-col>
              </el-row>
              <!-- <span v-else>21321321321</span> -->
              <el-row>
                <el-col>
                  <div class="grid-content bg-purple">家庭状况：</div>
                </el-col>
                <el-col>
                  <div style="width:60%;">{{checkdetailsData.family}}</div>
                  <div
                    style="display:flex;margin-top:0.2rem"
                    class="pic"
                    v-if="checkdetailsData.photos.filter(item => item.type === 2).length > 0"
                  >
                    <el-image
                      v-for="(item,index) in checkdetailsData.photos.filter(item => item.type === 2)[0].urls"
                      :key="index"
                      :src="item"
                      fit="cover"
                      @click="imgUrl(item)"
                    ></el-image>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <div class="grid-content bg-purple">学习情况：</div>
                </el-col>
                <el-col>
                  <div style="width:60%;">{{checkdetailsData.learn}}</div>
                  <div
                    style="display:flex;margin-top:0.2rem"
                    class="pic"
                    v-if="checkdetailsData.photos.filter(item => item.type === 3).length > 0"
                  >
                    <el-image
                      v-for="(item,index) in checkdetailsData.photos.filter(item => item.type === 3)[0].urls"
                      :key="index"
                      :src="item"
                      fit="cover"
                      @click="imgUrl(item)"
                    ></el-image>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </aside>
      </template>
    </el-dialog>
    <!-- 节点详情 -->
    <el-dialog title="审核节点" :visible.sync="dialogVisible" width="60%" @close="handleClose">
      <template>
        <el-table :data="checkData" border style="width: 100%;text-align:center">
          <el-table-column type="index" label="审核编号" width="120"></el-table-column>
          <el-table-column prop="auditStatus" label="审核结果" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.auditStatus === 1" style="color:#40d0b3">通过</span>
              <span v-else-if="scope.row.auditStatus === 2" style="color:red">审核不通过</span>
            </template>
          </el-table-column>
          <el-table-column prop="auditTime" label="审核时间" min-width="120"></el-table-column>
          <el-table-column prop="auditDesc" label="审核意见" min-width="120"></el-table-column>
        </el-table>
      </template>
    </el-dialog>
    <!-- 图片预览 -->
    <div class="bigImg" v-show="imgStatus" @click="bigImg">
      <div>
        <img :src="imgurl" width="60%" />
      </div>
    </div>
  </div>
</template>

<script>
import service from "@/api";
import preview from "@/mixins/preview";
import menusId from "@/mixins/menusId";

export default {
  data() {
    return {
      formInline: {
        organization: "",
        region: "0",
        programName: ""
      },
      item: {
        auditDesc: "",
        auditStatus: 1,
        projectId: 0,
        projectType: 0
      },
      tableData: [],
      checkData: [],
      total: 0,
      pageSize: 20,
      pageNum: 1,
      dialogVisible: false,
      personDetails: false,
      checkPersonDetails: false,
      checkdetailsData: "",
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      icon: require("../../../assets/selectedLove.png"),
      no_icon: require("../../../assets/select.png")
    };
  },

  mounted() {
    this.personsList();
  },
  mixins: [preview, menusId],
  computed: {
    list() {
      return this.$store.state.menusLists;
    }
  },
  methods: {
    async personalDelete(projectId) {
      let res = await service.personalDelete(projectId);
      if (res.code === 200) {
        this.personsList();
      }
    },

    // 点击受助人
    detailsInfo(projectId, status) {
      this.checkdetails(projectId, status);
    },

    async checkdetails(projectId, status) {
      let res = await service.checkdetails(projectId);

      if (res.code === 200) {
        if (status === 1) {
          this.checkPersonDetails = true;
        } else {
          this.personDetails = true;
        }
        this.checkdetailsData = res.data;
        let projectDetail = res.data.photos.filter(item => item.type === 3);
        console.log(projectDetail);
        // this.checkdetailsData.
      }
    },

    // 点击查询
    onSubmit() {
      this.pageNum = 1;
      this.personsList(this.formInline.cardId);
    },

    // 选择项目状态
    changeStatus($event) {
      this.pageNum = 1;
      this.personsList();
    },

    // 数据调取接口
    async personsList(cardId) {
      cardId = cardId || "";

      let res = await service.personsList({
        auditStatus: this.formInline.region,
        cardId: cardId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      });

      if (res.code === 200) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      } else if (res.code === 904) {
        this.tableData = [];
        this.total = 1;
      }
    },
    handleClick(projectId) {
      this.checkdetails(projectId);
      this.item.projectId = projectId;
    },

    submit() {
      if (this.item.auditStatus == "2") {
        if (this.item.auditDesc == "") {
          this.$message({
            message: "请输入审核意见",
            type: "warning"
          });
          return false;
        }
      }
      this.auditSubmit(this.item);
    },

    async auditSubmit(item) {
      let res = await service.auditSubmit(item);

      if (res.code === 200) {
        this.personDetails = false;
        this.personsList();
        this.$message({
          message: "审核成功",
          type: "success"
        });
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
      this.personsList();
    },

    // 获取当前页
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.personsList();
    },

    /// 点击关闭待审核
    handleClose() {},

    // 点击待审核
    checking(projectId) {
      this.dialogVisible = true;
      this.checkedNode(projectId);
    },

    async checkedNode(projectId) {
      let res = await service.checkedNode({
        projectId: projectId,
        projectType: 0
      });
      if (res.code === 200) {
        this.checkData = res.data;
      } else {
        this.checkData = [];
      }
    },

    recommend(projectId) {
      console.log(projectId);
      this.$confirm("是否推荐该项目", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "primary"
      })
        .then(() => {
          this.recommendProject(projectId);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消推荐"
          });
        });
    },

    async recommendProject(projectId) {
      let res = await service.recommendProject({
        projectId: projectId,
        projectType: 0
      });
      console.log(res);
      if (res.code === 200) {
        this.$message({
          type: "success",
          message: "推荐成功!"
        });
      } else {
        this.$message({
          type: "info",
          message: "已取消推荐"
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

.loveValue {
  width: 20px;
  height: 20px;
}
</style>
