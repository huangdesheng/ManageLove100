<style>
</style>
<template>
  <div class="helpFul manageHelp">
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
              <el-form-item label="年级">
                <el-select v-model="formInline.classNumber" placeholder="全部" @change="changeStatus">
                  <el-option
                    v-for="(item,index) in gradeArr"
                    :key="index"
                    :label="item.gradeName"
                    :value="item.classNumber"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="缴费状态">
                <el-select
                  v-model="formInline.payNumber"
                  placeholder="全部"
                  @change="changePayStatus"
                >
                  <el-option
                    v-for="(item,index) in payStatus"
                    :key="index"
                    :label="item.payName"
                    :value="item.payNumber"
                  ></el-option>
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
              <el-table-column prop="title" label="项目名称" min-width="200"></el-table-column>
              <el-table-column prop="name" label="受助人姓名" min-width="100">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="checkDetails(scope.row.recipientsId)"
                  >{{scope.row.name}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="classNumber" label="年级" min-width="100"></el-table-column>
              <el-table-column prop="cardId" label="身份证号码" min-width="120"></el-table-column>
              <el-table-column prop="postTime" label="发起时间" min-width="100"></el-table-column>
              <el-table-column prop="type" label="缴费方式" min-width="100">
                <template slot-scope="scope">
                  <span v-if="scope.row.type === 0">每年缴费</span>
                  <span v-else-if="scope.row.type === 1">一次性缴费</span>
                </template>
              </el-table-column>
              <el-table-column label="缴费金额" min-width="120">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="checkBill(scope.row.recipientsId)">查看</el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="deleteBill(scope.row.recipientsId)"
                  >临时删除</el-button>
                </template>
              </el-table-column>
              <el-table-column label="缴费状态" min-width="120">
                <template slot-scope="scope">
                  <span size="small" v-if="scope.row.status === 1" type="text">生效中</span>
                  <span type="text" size="small" v-else-if="scope.row.status === 2">已完成</span>
                  <span type="text" size="small" v-else-if="scope.row.status === 3">暂停缴费</span>
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
    <el-dialog title="缴费金额详情" :visible.sync="dialogVisible" width="60%" @close="handleClose">
      <template>
        <el-table :data="checkData" border style="width: 100%;text-align:center">
          <el-table-column prop="postTime" label="时间" min-width="120"></el-table-column>
          <el-table-column prop="province" label="爱心状况" min-width="120">
            <template slot-scope="scope">
              <span
                v-for="(item,index) in Array.from(
          { length: scope.row.alreadyHelp },
          (v, k) => k
        )"
                :key="index"
              >
                <img :src="icon" alt class="loveValue" />
              </span>
              <span>
                <img
                  v-for="(item,index) in Array.from(
          { length: scope.row.frequencyCount-scope.row.alreadyHelp },
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
          <el-table-column prop="amount" label="金额(元)" min-width="120"></el-table-column>
        </el-table>
      </template>
    </el-dialog>

    <!-- 教育互助详情 -->
    <el-dialog
      :visible.sync="helpDetails"
      width="85%"
      @close="handleClose"
      class="details comom"
      title="受助人信息"
    >
      <template>
        <aside style="width:80vw;margin-top:0.5rem" class="aside">
          <el-row>
            <el-col>
              <div class="grid-content bg-purple">受助人头像:</div>
            </el-col>
            <el-col class="avatar">
              <div class="block">
                <el-image :src="mutualData.photo" @click="imgUrl(mutualData.photo)" fit="cover"></el-image>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="grid-content bg-purple">受助人姓名:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">{{mutualData.name}}</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <div class="grid-content bg-purple">身份证号:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">{{mutualData.cardId}}</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <div class="grid-content bg-purple">年级:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">{{mutualData.classNumber}}</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <div class="grid-content bg-purple">年龄:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">{{mutualData.age}}岁</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <div class="grid-content bg-purple">爱心状况:</div>
            </el-col>
            <el-col>
              <template>
                <span
                  v-for="(item,index) in Array.from(
          { length: mutualData.alreadyHelp },
          (v, k) => k
        )"
                  :key="index"
                >
                  <img :src="icon" alt class="loveValue" />
                </span>
                <span>
                  <img
                    v-for="(item,index) in Array.from(
          { length: mutualData.frequencyCount - mutualData.alreadyHelp},
          (v, k) => k
        )"
                    :key="index"
                    :src="no_icon"
                    alt
                    class="loveValue"
                  />
                </span>
              </template>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="grid-content bg-purple">地区:</div>
            </el-col>
            <el-col>
              <div class="grid-content bg-purple-light">{{mutualData.region}}</div>
            </el-col>
          </el-row>

          <div class="info">
            <div>
              <el-row>
                <el-col>
                  <div class="grid-content bg-purple">身份/户口本照片：</div>
                </el-col>
                <el-col class="cardId">
                  <div>
                    <el-image
                      :src="mutualData.urls[0]"
                      @click="imgUrl(mutualData.urls[0])"
                      fit="cover"
                    ></el-image>
                  </div>
                  <div>
                    <el-image
                      :src="mutualData.urls[1]"
                      @click="imgUrl(mutualData.urls[1])"
                      fit="cover"
                    ></el-image>
                  </div>
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
      formInline: {
        cardId: "",
        classNumber: "0",
        payNumber: "0",
        name: ""
      },
      gradeArr: [
        {
          gradeName: "全部",
          classNumber: "0"
        },
        {
          gradeName: "一年级",
          classNumber: "1"
        },
        {
          gradeName: "二年级",
          classNumber: "2"
        },
        {
          gradeName: "三年级",
          classNumber: "3"
        },
        {
          gradeName: "四年级",
          classNumber: "4"
        },
        {
          gradeName: "五年级",
          classNumber: "5"
        },
        {
          gradeName: "六年级",
          classNumber: "6"
        },
        {
          gradeName: "七年级",
          classNumber: "7"
        },
        {
          gradeName: "八年级",
          classNumber: "8"
        },
        {
          gradeName: "九年级",
          classNumber: "9"
        }
      ],

      payStatus: [
        {
          payName: "全部",
          payNumber: "0"
        },
        {
          payName: "生效中",
          payNumber: "1"
        },
        {
          payName: "已完成",
          payNumber: "2"
        },
        {
          payName: "暂停缴费",
          payNumber: "3"
        }
      ],
      tableData: [],
      checkData: [
        {
          time: "2019-7-15"
        }
      ],
      total: 0,
      pageSize: 20,
      pageNum: 1,
      dialogVisible: false,
      icon: require("../../assets/selectedLove.png"),
      no_icon: require("../../assets/select.png"),
      helpDetails: false,
      mutualData: {
        urls: []
      } //受助人详情
    };
  },

  mounted() {
    this.mutualList();
  },

  mixins: [preview, menusId],

  methods: {
    // 临时删除
    async deleteBill(recipientsId) {
      let res = await service.deleteBill(recipientsId);
      if (res.code === 200) {
        this.mutualList();
      }
    },

    // 点击查询
    onSubmit() {
      this.pageNum = 1;
      this.mutualList(this.formInline.cardId, this.formInline.name);
    },

    // 选择年级查询
    changeStatus($event) {
      this.pageNum = 1;
      this.mutualList();
    },
    // 选择缴费状态查询
    changePayStatus() {
      this.pageNum = 1;
      this.mutualList();
    },

    // 数据调取接口
    async mutualList(cardId, name) {
      cardId = cardId || "";
      name = name || "";
      let res = await service.mutualList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        cardId: cardId,
        classNumber: this.formInline.classNumber,
        status: this.formInline.payNumber,
        name: name
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

    // 每页的条数
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.mutualList();
    },

    // 获取当前页
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.mutualList();
    },

    /// 点击关闭待审核
    handleClose() {},

    // 点击查看缴费账单
    checkBill(recipientsId) {
      this.dialogVisible = true;
      this.bill(recipientsId);
    },

    async bill(recipientsId) {
      let res = await service.bill(recipientsId);
      if (res.code === 200) {
        this.checkData = res.data;
        let leng = res.data[0].frequencyCount;
        var arr = Array.from(
          { length: res.data[0].frequencyCount },
          (v, k) => k
        );
      } else {
        this.$message({
          message: res.message,
          type: "warning"
        });
      }
    },

    async checkDetails(recipientsId) {
      //互助
      let res = await service.mutualDetails(recipientsId);
      if (res.code === 200) {
        this.helpDetails = true;
        this.mutualData = res.data;
      } else {
        this.helpDetails = false;
        this.$message({
          type: "warning",
          message: res.message
        });
      }
    }
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

.loveValue {
  width: 20px;
  height: 20px;
}

aside {
  .avatar {
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
</style>
