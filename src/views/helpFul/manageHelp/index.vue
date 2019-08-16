<style>
</style>
<template>
  <div class="helpFul manageHelp">
    <!-- 内容 -->
    <div>
      <div>
        <template>
          <header>
            <el-form :model="formInline" class="demo-form-inline">
              <el-form-item label="受助人身份证">
                <el-input v-model="formInline.cardId" placeholder="受助人身份证号码"></el-input>
              </el-form-item>
              <el-form-item label="受助人姓名">
                <el-input v-model="formInline.name" placeholder="受助人姓名"></el-input>
              </el-form-item>
              <el-form-item label="帮扶状态">
                <el-select
                  v-model="formInline.planStatus"
                  clearable
                  placeholder="全部"
                  @change="changeStatus"
                >
                  <el-option label="全部" value></el-option>
                  <el-option label="已过期" value="-1"></el-option>
                  <el-option label="未帮扶" value="0"></el-option>
                  <el-option label="帮扶完成" value="1"></el-option>
                  <el-option label="帮扶中" value="2"></el-option>
                  <el-option label="帮扶暂停" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="帮扶类型">
                <el-select
                  v-model="formInline.projectType"
                  clearable
                  placeholder="项目状态"
                  @change="changeStatus"
                >
                  <el-option label="个人" value="0"></el-option>
                  <el-option label="团体" value="1"></el-option>
                </el-select>
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
              <el-table-column prop="projectType" label="帮扶类型" min-width="80">
                <template slot-scope="scope">
                  <span v-if="scope.row.projectType === 0">个人</span>
                  <span v-else-if="scope.row.projectType === 1">团体</span>
                </template>
              </el-table-column>
              <el-table-column prop="projectTitle" label="认领项目" min-width="180"></el-table-column>
              <el-table-column prop="supporterName" label="认领人" min-width="120"></el-table-column>
              <el-table-column prop="supportTime" label="认领时间" min-width="120"></el-table-column>
              <el-table-column prop="recipientsName" label="受助人" min-width="100">
                <template slot-scope="scope">
                  <el-button
                    @click="handleClick(scope.row.projectType,scope.row.projectId,scope.row.recipientsId)"
                    type="text"
                    size="small"
                  >{{scope.row.recipientsName}}</el-button>
                  <!-- <span
                    @click="handleClick(scope.row.projectType,scope.row.projectId,scope.row.recipientsId)"
                  >{{scope.row.recipientsName}}</span>-->
                </template>
              </el-table-column>
              <el-table-column prop="cardId" label="受助人身份证" min-width="120"></el-table-column>
              <el-table-column prop="recipientsCount" label="缴费状态" min-width="180">
                <template slot-scope="scope">
                  <span
                    v-for="(item,index) in Array.from(
          { length: scope.row.loveValue },
          (v, k) => k
        )"
                    :key="index"
                  >
                    <img
                      :src="icon"
                      alt
                      class="loveValue"
                      @click="checking(scope.row.projectType,scope.row.recipientsId,scope.row.planId)"
                    />
                  </span>
                  <span>
                    <img
                      v-for="(item,index) in Array.from(
          { length: scope.row.totalPeriods - scope.row.loveValue},
          (v, k) => k
        )"
                      :key="index"
                      :src="no_icon"
                      alt
                      class="loveValue"
                      @click="checking(scope.row.projectType,scope.row.recipientsId,scope.row.planId)"
                    />
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="planStatus" label="帮扶状态" min-width="100">
                <template slot-scope="scope">
                  <span v-if="scope.row.planStatus === 0">帮扶中</span>
                  <span v-else-if="scope.row.planStatus === 1">帮扶完成</span>
                  <span v-else-if="scope.row.planStatus === 2">帮扶中</span>
                  <span v-else-if="scope.row.planStatus === 3">帮扶暂停</span>
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
    <!-- 缴费账单 -->
    <el-dialog title="缴费账单" :visible.sync="dialogVisible" width="60%" @close="handleClose">
      <template>
        <el-table :data="checkData" border style="width: 100%;text-align:center">
          <el-table-column type="index" label="序号" width="120"></el-table-column>
          <el-table-column prop="date" label="缴费时间" min-width="120"></el-table-column>
          <el-table-column prop="auditTime" label="缴费状态" min-width="120">
            <template slot-scope="scope">
              <span
                v-for="(item,index) in Array.from(
          { length: scope.row.loveValue },
          (v, k) => k
        )"
                :key="index"
              >
                <img :src="icon" alt class="loveValue" />
              </span>
              <span>
                <img
                  v-for="(item,index) in Array.from(
          { length: scope.row.totalPeriods - scope.row.loveValue},
          (v, k) => k
        )"
                  :key="index"
                  :src="no_icon"
                  alt
                  class="loveValue"
                />
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="缴费金额(元)" min-width="120"></el-table-column>
        </el-table>
      </template>
    </el-dialog>

    <!-- 查看项目详情（团体） -->
    <el-dialog :visible.sync="programDetails" width="85%" class="details comom" title="查看详情">
      <template v-if="projectDetail != ''">
        <aside style="margin-top:20px;" class="aside">
          <el-row>
            <el-col>
              <div class="grid-content bg-purple">项目标题:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">{{projectDetail.groupProjectBaseVO.title}}</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <div class="grid-content bg-purple">项目介绍:</div>
            </el-col>
            <el-col>
              <div
                class="grid-content bg-purple-light"
              >{{projectDetail.groupProjectBaseVO.introduce}}。</div>
            </el-col>
          </el-row>
          <!-- <span>44544456546564564564</span> -->
          <el-row>
            <el-col>
              <div class="grid-content bg-purple">机构名称:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">{{projectDetail.organBaseVO.name}}</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <div class="grid-content bg-purple">机构负责人:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">{{projectDetail.organBaseVO.corporation}}</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <div class="grid-content bg-purple">机构地址:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">{{projectDetail.organBaseVO.address}}</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <div class="grid-content bg-purple">受助人头像:</div>
            </el-col>
            <el-col class="avatar">
              <div
                class="block"
                v-for="(item,index) in projectDetail.recipientsVOS"
                :key="index"
                @click="handlePhoto(index)"
                :class="menuIndex === index?'on':''"
              >
                <el-image :src="item.photo" fit="cover"></el-image>
              </div>
            </el-col>
          </el-row>

          <div class="info" id="div" ref="tet">
            <div v-for="(item,index) in projectDetail.recipientsVOS" :key="index" class="node">
              <el-row>
                <el-col>
                  <div class="grid-content bg-purple">基本信息:</div>
                </el-col>
                <el-col>
                  <span style="margin-right:0.3rem">{{item.name}}</span>
                  <span style="margin-right:0.3rem">{{item.sex === 1?'男':'女'}}</span>
                  <span style="margin-right:0.3rem">{{item.age}}岁</span>
                  <span style="margin-right:0.3rem">{{item.classNumber}}年级</span>
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
          { length: item.loveValue },
          (v, k) => k
        )"
                        :key="index"
                      >
                        <img :src="icon" alt class="loveValue" />
                      </span>
                      <span>
                        <img
                          v-for="(items,index) in Array.from(
          { length: item.totalPeriods - item.loveValue},
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
                  <div class="grid-content bg-purple">地址:</div>
                </el-col>
                <el-col>
                  <div class="grid-content bg-purple-light">{{item.address}}</div>
                </el-col>
              </el-row>

              <el-row>
                <el-col>
                  <div class="grid-content bg-purple">身份/户口本照片：</div>
                </el-col>
                <el-col class="cardId" v-if="item.photos != null">
                  <div>
                    <el-image
                      :src="item.photos[0].urls[0]"
                      fit="cover"
                      @click="imgUrl(item.photos[0].urls[0])"
                    ></el-image>
                  </div>
                  <div>
                    <el-image
                      :src="item.photos[0].urls[1]"
                      fit="cover"
                      @click="imgUrl(item.photos[0].urls[1])"
                    ></el-image>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <div class="grid-content bg-purple">家庭状况：</div>
                </el-col>
                <el-col>
                  <div style="width:60%">{{item.family}}</div>
                  <template v-if="item.photos != null">
                    <div
                      style="display:flex;margin-top:0.2rem"
                      class="pic"
                      v-if="item.photos[1] != undefined"
                    >
                      <el-image
                        v-for="(item,index) in item.photos[1].urls"
                        :key="index"
                        :src="item"
                        fit="cover"
                        @click="imgUrl(item)"
                      ></el-image>
                    </div>
                  </template>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <div class="grid-content bg-purple">学习情况：</div>
                </el-col>
                <el-col>
                  <div style="width:60%">{{item.learn}}</div>
                  <template v-if="item.photos != null">
                    <div
                      style="display:flex;margin-top:0.2rem"
                      class="pic"
                      v-if="item.photos[2] != undefined"
                    >
                      <el-image
                        v-for="(item,index) in item.photos[2].urls"
                        :key="index"
                        :src="item"
                        fit="cover"
                        @click="imgUrl(item)"
                      ></el-image>
                    </div>
                  </template>
                </el-col>
              </el-row>
            </div>
          </div>
        </aside>
      </template>
    </el-dialog>

    <!-- 查看项目详情（个人） -->
    <el-dialog
      :visible.sync="checkPersonDetails"
      width="85%"
      @close="handleClose"
      class="details personal commom"
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
        </aside>
      </template>
    </el-dialog>
    <!-- 图片预览 -->
    <div class="bigImg" v-show="imgStatus" @click="bigImg">
      <div>
        <img :src="imgurl" />
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
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      formInline: {
        name: "",
        cardId: "",
        planStatus: "",
        projectType: "0"
      },
      tableData: [],
      checkData: [],
      total: 0,
      pageSize: 20,
      pageNum: 1,
      dialogVisible: false,
      programDetails: false,
      checkPersonDetails: false,
      icon: require("../../../assets/selectedLove.png"),
      no_icon: require("../../../assets/select.png"),
      textarea: "",
      item: {
        auditDesc: "",
        auditStatus: 1,
        projectId: 0,
        projectType: 1
      },
      projectDetail: "",
      changeValue: 1,
      checkdetailsData: ""
    };
  },

  mixins: [preview, menusId],

  mounted() {
    this.plansList();
  },
  updated() {
    // this.changeValue = 0;
    // let index = this.changeValue;
    // this.$nextTick(() => {
    //   this.$refs.tet.childNodes[index].style.display = "block";
    // });
  },

  methods: {
    // 点击查询
    onSubmit() {
      this.pageNum = 1;
      this.plansList(this.formInline.cardId, this.formInline.name);
    },

    handlePhoto(index) {
      for (var i = 0; i < this.$refs.tet.childNodes.length; i++) {
        this.$refs.tet.childNodes[i].style.display = "none";
      }
      this.$refs.tet.childNodes[index].style.display = "block";
    },

    // 选择项目状态
    changeStatus($event) {
      this.pageNum = 1;
      this.plansList();
    },

    // 数据调取接口
    async plansList(cardId, name) {
      name = name || "";
      cardId = cardId || "";

      let res = await service.plansList({
        planStatus: this.formInline.planStatus,
        recipientsName: name,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        cardId: cardId,
        projectType: this.formInline.projectType
      });

      if (res.code === 200) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      } else if (res.code === 904) {
        this.tableData = [];
        this.total = 1;
      }
    },

    // // 点击审核
    handleClick(projectType, projectId, recipientsId) {
      if (projectType === 0) {
        this.checkdetails(projectId);
      } else {
        this.groupsDetails(projectId, recipientsId);
      }
    },

    async groupsDetails(projectId, recipientsId) {
      let res = await service.groupsDetails({ projectId, recipientsId });
      if (res.code === 200) {
        this.programDetails = true;
        this.item.projectId = projectId;
        this.projectDetail = res.data;
        this.$nextTick(() => {
          this.$refs.tet.childNodes[0].style.display = "block";
        });
      } else {
        this.$message({
          type: "warning",
          message: res.message
        });
      }
    },

    async checkdetails(projectId) {
      let res = await service.checkdetails(projectId);
      console.log(res);
      if (res.code === 200) {
        this.checkPersonDetails = true;
        this.checkdetailsData = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.message
        });
      }
    },

    // 点击提交
    submit() {
      this.auditSubmit(this.item);
    },

    async auditSubmit(item) {
      let res = await service.auditSubmit(item);
      if (res.code === 200) {
        this.programDetails = false;
        this.plansList();
        this.message({
          message: "审核成功",
          type: "success"
        });
      } else {
        this.message({
          message: res.message,
          type: "warning"
        });
      }
    },

    // 每页的条数
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.plansList();
    },

    // 获取当前页
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.plansList();
    },

    /// 点击关闭待审核
    handleClose() {},

    // 点击爱心
    checking(projectType, recipientsId, planId) {
      this.payBill(projectType, recipientsId, planId);
    },

    async payBill(projectType, recipientsId, planId) {
      let res = await service.payBill({
        planId: planId,
        recipientsId: recipientsId,
        projectType: projectType
      });
      this.dialogVisible = true;
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
        projectType: 1
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
          display: flex;

          .el-form-item {
            display: flex;
            width: 18%;
            margin-right: 0.3rem;
            .el-form-item__content {
              flex: 1;
            }
          }
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

.node {
  display: none;
}
</style>
