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
              <el-form-item label="发起机构">
                <el-input v-model="formInline.organization" placeholder="机构名称"></el-input>
              </el-form-item>
              <el-form-item label="项目名称">
                <el-input v-model="formInline.programName" placeholder="项目名称"></el-input>
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
              <el-table-column prop="title" label="项目名称" min-width="120">
                <template slot-scope="scope">
                  <el-button
                    @click="handleClick(scope.row.projectId,1)"
                    size="small"
                    type="text"
                  >{{scope.row.title}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="organName" label="发起机构" min-width="180"></el-table-column>
              <el-table-column prop="recipientsCount" label="受助人数" width="100"></el-table-column>
              <el-table-column prop="postTime" label="申请时间" min-width="100"></el-table-column>
              <el-table-column prop="auditStatus" label="审核状态" min-width="100">
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
                v-if="list.indexOf('160') != -1 || list.indexOf(160) != -1"
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

                  <el-button type="text" size="small" @click="groupDelete(scope.row.projectId)">临时删除</el-button>
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
    <el-dialog title="审核节点" :visible.sync="dialogVisible" width="60%" @close="handleClose">
      <template>
        <el-table :data="checkData" border style="width: 100%;text-align:center">
          <el-table-column type="index" label="审核编号" width="120"></el-table-column>
          <el-table-column prop="auditStatus" label="审核结果" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.auditStatus === 1">通过</span>
              <span v-else-if="scope.row.auditStatus === 2" style="color:red">审核不通过</span>
            </template>
          </el-table-column>
          <el-table-column prop="auditTime" label="审核时间" min-width="120"></el-table-column>
          <el-table-column prop="auditDesc" label="审核意见" min-width="120"></el-table-column>
        </el-table>
      </template>
    </el-dialog>

    <!-- 查看详情（审核） -->
    <el-dialog :visible.sync="programDetails" width="85%" class="details comom" title="项目详情">
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
                      v-if="item.photos.filter(items=>items.type === 2).length > 0"
                    >
                      <el-image
                        v-for="(item,index) in item.photos.filter(items=>items.type === 2)[0].urls"
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
                      v-if="item.photos.filter(items=>items.type === 3).length > 0"
                    >
                      <el-image
                        v-for="(item,index) in item.photos.filter(items=>items.type === 3)[0].urls"
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
                style="width:30%"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 6}"
                placeholder="请输入内容"
                v-model.trim="item.auditDesc"
              ></el-input>
            </el-col>
          </el-row>
          <el-row class="btn" style="display:flex;justify-content:center">
            <el-button style="margin-right:0.6rem" @click="programDetails=false">取消</el-button>
            <el-button type="primary" @click="submit">确定</el-button>
          </el-row>
        </aside>
      </template>
    </el-dialog>

    <!-- 查看详情 （查看） -->
    <el-dialog :visible.sync="programDetailsN" width="85%" class="details comom" title="项目详情">
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
                      v-if="item.photos.filter(items=>items.type === 2).length > 0"
                    >
                      <el-image
                        v-for="(item,index) in item.photos.filter(items=>items.type === 2)[0].urls"
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
                      v-if="item.photos.filter(items=>items.type === 3).length > 0"
                    >
                      <el-image
                        v-for="(item,index) in item.photos.filter(items=>items.type === 3)[0].urls"
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
        organization: "",
        region: "0",
        programName: ""
      },
      radio: 3,
      tableData: [],
      checkData: [],
      total: 0,
      pageSize: 20,
      pageNum: 1,
      dialogVisible: false,
      programDetails: false,
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
      programDetailsN: false,
      menuIndex: 0
    };
  },
  mixins: [preview, menusId],
  mounted() {
    this.groupsList();
  },

  // 权限判断
  computed: {
    list() {
      return this.$store.state.menusLists;
    }
  },

  methods: {
    // 临时删除
    async groupDelete(projectId) {
      let res = await service.groupDelete(projectId);
      if (res.code === 200) {
        this.groupsList();
      }
    },
    // 点击查询
    onSubmit() {
      this.pageNum = 1;
      this.groupsList(
        this.formInline.organization,
        this.formInline.programName
      );
    },

    handlePhoto(index) {
      this.menuIndex = index;
      for (var i = 0; i < this.$refs.tet.childNodes.length; i++) {
        this.$refs.tet.childNodes[i].style.display = "none";
      }
      this.$refs.tet.childNodes[index].style.display = "block";
    },

    // 选择项目状态
    changeStatus($event) {
      this.pageNum = 1;
      this.groupsList();
    },

    // 数据调取接口
    async groupsList(organName, title) {
      organName = organName || "";
      title = title || "";
      console.log(this.pageNum);
      let res = await service.groups({
        auditStatus: this.formInline.region,
        organName: organName,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        title: title
      });

      if (res.code === 200) {
        this.tableData = res.data.list;
        this.total = res.data.total;
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

    // 点击审核
    handleClick(projectId, status) {
      this.groupsDetails(projectId, status);
    },

    async groupsDetails(projectId, status) {
      let res = await service.groupsDetails({ projectId });
      if (res.code === 200) {
        this.menuIndex = 0;
        if (status === 1) {
          this.programDetailsN = true;
        } else {
          this.programDetails = true;
        }
        this.item.projectId = projectId;
        this.projectDetail = res.data;

        this.$nextTick(() => {
          this.$refs.tet.childNodes[0].style.display = "block";
        });
      }
    },

    // 点击提交
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
        this.programDetails = false;
        this.groupsList();
        this.$message({
          message: "审核完成",
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
      this.groupsList();
    },

    // 获取当前页
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.groupsList();
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
        projectType: 1
      });
      if (res.code === 200) {
        this.checkData = res.data;
      } else {
        this.checkData = [];
      }
    },
    recommend(projectId) {
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
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 100%;
      overflow: hidden;
      margin-right: 0.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
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
.on {
  border: 2px solid red;
}

.aside {
  min-height: 300px;
  overflow-y: auto;
  .el-row {
    display: flex;
    .el-col {
      width: auto !important;
      font-size: 0.28rem;
      color: #000;
      text-align: right;
      width: 150px !important;
      margin-right: 0.35rem;
      &:nth-of-type(2) {
        color: #666;
        text-align: left;
        flex: 1;
        .bg-purple-light {
          width: 60%;
        }
      }
    }
  }
}
</style>
