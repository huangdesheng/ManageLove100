<style>
</style>
<template>
  <div class="helpFul applyAward">
    <!-- 内容 -->
    <div>
      <div>
        <template>
          <header>
            <el-form :model="formInline" class="demo-form-inline">
              <el-form-item label="审核状态">
                <el-select
                  v-model="formInline.checkNumber"
                  placeholder="全部"
                  @change="changeCheckStatus"
                >
                  <el-option
                    v-for="(item,index) in saveStatus"
                    :key="index"
                    :label="item.checkName"
                    :value="item.checkNumber"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="受助人身份证">
                <el-input v-model="formInline.cardId" placeholder="受助人身份证"></el-input>
              </el-form-item>
              <el-form-item label="受助人姓名">
                <el-input v-model="formInline.name" placeholder="受助人姓名"></el-input>
              </el-form-item>
              <el-form-item label="项目名称">
                <el-input v-model="formInline.title" placeholder="项目名称"></el-input>
              </el-form-item>
              <el-form-item label="受助类型">
                <el-select
                  v-model="formInline.helpNumber"
                  placeholder="全部"
                  @change="changehelpStatus"
                >
                  <el-option
                    v-for="(item,index) in helpStatus"
                    :key="index"
                    :label="item.helpName"
                    :value="item.helpNumber"
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
              <el-table-column prop="status" label="受助类型" min-width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 1">教育互助</span>
                  <span v-else>教育帮扶</span>
                </template>
              </el-table-column>
              <el-table-column prop="title" label="项目名称" min-width="150"></el-table-column>
              <el-table-column prop="name" label="受助人" min-width="120">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="checkDetails(scope.row.recipientsId,scope.row.status)"
                  >{{scope.row.name}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="cardId" label="受助人身份证" min-width="120"></el-table-column>
              <el-table-column prop="tele" label="受助人联系方式" min-width="120"></el-table-column>
              <el-table-column label="缴费状态" min-width="150">
                <template slot-scope="scope">
                  <span
                    v-for="(item,index) in Array.from(
          { length: scope.row.alreadyHelp },
          (v, k) => k
        )"
                    :key="index"
                    @click="loveBtn(scope.row.recipientsId,scope.row.status)"
                  >
                    <img :src="icon" alt class="loveValue" />
                  </span>
                  <span @click="loveBtn(scope.row.recipientsId,scope.row.status)">
                    <img
                      v-for="(item,index) in Array.from(
          { length:scope.row.frequencyCount- scope.row.alreadyHelp},
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
              <el-table-column prop="auditStatus" label="审核状态" min-width="120">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.auditStatus === 0"
                    @click="No_check(scope.row.recipientsId,scope.row.status)"
                  >待审核</span>
                  <span
                    v-else-if="scope.row.auditStatus === 1"
                    @click="No_check(scope.row.recipientsId,scope.row.status)"
                  >审核通过</span>
                  <span
                    v-else-if="scope.row.auditStatus === 2"
                    @click="No_check(scope.row.recipientsId,scope.row.status)"
                    style="color:red"
                  >审核不通过</span>
                  <span
                    v-else-if="scope.row.auditStatus === 3"
                    @click="No_check(scope.row.recipientsId,scope.row.status)"
                  >公示中</span>
                  <span
                    v-else-if="scope.row.auditStatus === 4"
                    @click="No_check(scope.row.recipientsId,scope.row.status)"
                  >未申请</span>
                  <span v-else>已完成</span>
                </template>
              </el-table-column>
              <el-table-column prop="postTime" label="申请时间" min-width="120"></el-table-column>
              <el-table-column
                label="操作"
                min-width="100"
                class="make"
                v-if="list.indexOf('180') != -1 || list.indexOf(180) != -1"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="checkBtn(scope.row.recipientsId,scope.row.status)"
                    v-if="scope.row.auditStatus === 0"
                  >审核</el-button>
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

    <!-- 奖励金审核 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="80%"
      @close="handleClose"
      title="受助人信息"
      class="welfare"
    >
      <template>
        <el-form label-position="left" label-width="140px" :model="formLabelAlign">
          <el-form-item label="受助人姓名">
            <el-input v-model="formLabelAlign.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="受助人收款账号">
            <el-input v-model="formLabelAlign.bankAccount" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="开户行名称" prop="desc">
            <el-input v-model="formLabelAlign.bankName" :rows="3" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="银行预留手机号" prop="desc">
            <el-input v-model="formLabelAlign.bankTele" :rows="3.5" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="证明材料" prop="desc">
            <template>
              <div class="pic_n">
                <div>
                  <el-image
                    :src="formLabelAlign.urls[0]"
                    @click="imgUrl(formLabelAlign.urls[0])"
                    fit="cover"
                  ></el-image>
                  <p>( 准考证号 )</p>
                </div>

                <div>
                  <el-image
                    :src="formLabelAlign.urls[1]"
                    @click="imgUrl(formLabelAlign.urls[1])"
                    fit="cover"
                  ></el-image>
                  <p>( 录取通知书 )</p>
                </div>
              </div>
            </template>
          </el-form-item>
          <el-form-item prop="desc" style="margin-top:0.8rem"></el-form-item>
          <el-form-item label="是否审核通过" prop="desc">
            <el-radio-group v-model="item.state">
              <el-radio :label="1">通过</el-radio>
              <el-radio :label="2">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审核意见" prop="desc">
            <el-input type="textarea" v-model.trim="item.auditDescribe" :rows="3.5"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm">取消</el-button>
            <el-button type="primary" @click="submitForm">确定</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-dialog>

    <!-- 审核节点 -->
    <el-dialog title="审核节点" :visible.sync="dialogVisibleNode" width="60%" @close="handleClose">
      <template>
        <el-table :data="checkData" border style="width: 100%;text-align:center">
          <el-table-column type="index" label="审核编号" width="120"></el-table-column>
          <el-table-column prop="auditStatus" label="审核结果" min-width="120"></el-table-column>
          <el-table-column prop="postTime" label="审核时间" min-width="120"></el-table-column>
          <el-table-column prop="auditDesc" label="审核意见" min-width="120"></el-table-column>
        </el-table>
      </template>
    </el-dialog>

    <!-- 缴费记录 -->
    <el-dialog title="缴费记录" :visible.sync="dialogVisibleRecord" width="60%" @close="handleClose">
      <template>
        <el-table :data="recordData" border style="width: 100%;text-align:center">
          <el-table-column type="index" label="序号" width="120"></el-table-column>
          <el-table-column prop="postTime" label="缴费时间" min-width="120"></el-table-column>
          <el-table-column label="缴费状态" min-width="120">
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
          { length: scope.row.frequencyCount - scope.row.alreadyHelp},
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

    <!-- 查看教育帮扶团体详情 -->
    <el-dialog :visible.sync="programDetails" width="85%" class="details comom" title="受助人信息">
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
              <div class="grid-content bg-purple-light">{{mutualData.classNumber}}年级</div>
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

    <!-- 个人详情 -->
    <el-dialog
      :visible.sync="checkPersonDetails"
      width="85%"
      @close="handleClose"
      class="details personal comom"
      title="受助人信息"
    >
      <template v-if="checkdetailsData != ''">
        <aside class="aside" style="display:block">
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
              <el-row>
                <el-col>
                  <div class="grid-content bg-purple">家庭状况：</div>
                </el-col>
                <el-col>
                  <div style="width:60%">{{checkdetailsData.family}}</div>
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
                  <div style="width:60%">{{checkdetailsData.learn}}</div>
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
      projectDetail: "",
      checkdetailsData: "",
      formInline: {
        checkNumber: "0",
        name: "",
        cardId: "",
        title: "",
        type: "",
        helpNumber: "0"
      },

      formLabelAlign: {
        name: "",
        bankAccount: "",
        bankName: "",
        bankTele: "", //管理费说明
        urls: []
      },

      item: {
        state: 1,
        auditDescribe: "",
        recipientsIds: "",
        type: ""
      },

      saveStatus: [
        {
          checkName: "待审核",
          checkNumber: "0"
        },
        {
          checkName: "未申请",
          checkNumber: "4"
        },
        {
          checkName: "不通过",
          checkNumber: "2"
        },
        {
          checkName: "公示中",
          checkNumber: "3"
        },
        {
          checkName: "已完成",
          checkNumber: "5"
        },
        {
          checkName: "全部",
          checkNumber: " "
        }
      ],
      helpStatus: [
        {
          helpName: "全部",
          helpNumber: "0"
        },
        {
          helpName: "教育互助",
          helpNumber: "1"
        },
        {
          helpName: "教育帮扶",
          helpNumber: "2"
        }
      ],
      tableData: [],
      checkData: [],
      recordData: [],
      mutualData: {
        urls: []
      }, //受助人详情
      total: 0,
      pageSize: 20,
      pageNum: 1,
      dialogVisible: false,
      checkPersonDetails: false,
      icon: require("../../assets/selectedLove.png"),
      no_icon: require("../../assets/select.png"),
      dialogVisibleNode: false,
      dialogVisibleRecord: false,
      programDetails: false,
      personDetails: false,
      helpDetails: false,
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      imageUrl: "",
      dialogVisiblePic: false,
      dialogImageUrl: "",
      disabled: false
    };
  },

  mixins: [preview, menusId],

  mounted() {
    this.rewardList();
  },

  computed: {
    list() {
      return this.$store.state.menusLists;
    }
  },

  methods: {
    // 申请奖励金数据调取接口
    async rewardList(name, cardId, title) {
      name = name || "";
      title = title || "";
      cardId = cardId || "";
      let res = await service.rewardList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        status: this.formInline.helpNumber,
        name: name,
        cardId: cardId,
        title: title,
        auditStatus: this.formInline.checkNumber
      });
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

    // 审核保存
    submitForm() {
      if (this.item.state == "2" && this.item.auditDescribe == "") {
        this.$message({
          message: "请输入审核意见",
          type: "warning"
        });
        return false;
      }
      this.checkSubmit(this.item);
    },
    async checkSubmit(item) {
      let res = await service.checkSubmit(item);
      if (res.code === 200) {
        this.dialogVisible = false;
        this.rewardList();
        this.$message({
          message: "审核成功",
          type: "success"
        });
      } else {
        this.$message({
          message: res.message,
          type: "success"
        });
      }
    },

    // 审核取消
    resetForm() {
      this.dialogVisible = false;
    },

    // 点击审核
    checkBtn(recipientsId, status) {
      this.checkQuery(recipientsId, status);
    },
    // 获取审核资料
    async checkQuery(recipientsId, status) {
      let res = await service.checkQuery({
        recipientsIds: recipientsId,
        type: status
      });
      if (res.code === 200) {
        this.dialogVisible = true;
        this.formLabelAlign = res.data;
        this.item.recipientsIds = recipientsId;
        this.item.type = status;
      } else {
        this.$message({
          type: "warning",
          message: res.message
        });
      }
    },

    // 点击待审核（产看节点信息）
    No_check(recipientsId, status) {
      this.dialogVisibleNode = true;
      this.checkNode(recipientsId, status);
    },

    async checkNode(recipientsId, status) {
      let res = await service.checkNode({
        recipientsIds: recipientsId,
        type: status
      });
      if (res.code === 200) {
        this.checkData = res.data;
        this.dialogVisibleNode = true;
      } else {
        this.checkData = [];
        this.$message({
          type: "warning",
          message: res.message
        });
      }
    },

    // 点击爱心（查看缴费记录）
    loveBtn(recipientsId, status) {
      this.dialogVisibleRecord = true;
      if (status === 1) {
        this.bill(recipientsId);
      } else {
        this.groupAbill(recipientsId);
      }
    },

    async bill(recipientsId) {
      let res = await service.bill(recipientsId);
      if (res.code === 200) {
        this.recordData = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.message
        });
      }
    },

    async groupAbill(recipientsId) {
      let res = await service.groupAbill(recipientsId);
      if (res.code === 200) {
        this.recordData = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.message
        });
      }
    },

    //查看受助人详情
    async checkDetails(recipientsId, status) {
      if (status === 1) {
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
      } else if (status === 2) {
        //团体个人
        let res = await service.personADetails(recipientsId);
        if (res.code === 200) {
          this.checkPersonDetails = true;
          this.checkdetailsData = res.data;
        } else {
          this.checkPersonDetails = false;
          this.$message({
            type: "warnning",
            message: res.message
          });
        }
      } else if (status === 3) {
        //团体
        let res = await service.groupADetails(recipientsId);
        if (res.code === 200) {
          this.programDetails = true;
          this.projectDetail = res.data;
        } else {
          this.programDetails = false;
          this.$message({
            type: "warning",
            message: res.message
          });
        }
      }
    },

    // 每页的条数
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.rewardList();
    },

    // 获取当前页
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.rewardList();
    },

    /// 点击关闭待审核
    handleClose() {},

    // change审核状态
    changeCheckStatus() {
      this.pageNum = 1;
      this.rewardList();
    },

    // change受助类型
    changehelpStatus() {
      this.pageNum = 1;
      this.rewardList();
    },

    // 点击查询
    onSubmit() {
      this.pageNum = 1;
      this.rewardList(
        this.formInline.name,
        this.formInline.cardId,
        this.formInline.title
      );
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

.aside {
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
      margin-bottom: 0.4rem;
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
