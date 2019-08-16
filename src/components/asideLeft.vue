
<template>
  <el-aside width="200px" style="background-color: #545c64;height:100%">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      unique-opened
      :default-active="$route.path"
      :collapse-transition="true"
    >
      <el-menu-item index="/index">
        <i class="el-icon-loading"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/mutualHelp" v-if="list.indexOf('2') !== -1 || list.indexOf(2) !== -1">
        <i class="el-icon-loading"></i>
        <span slot="title">教育互助</span>
      </el-menu-item>
      <el-submenu index="/helpFul" v-if="list.indexOf('3') != -1 || list.indexOf(3) != -1">
        <template slot="title">
          <i class="el-icon-loading"></i>
          <span slot="title">教育帮扶</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            index="/helpFul/groupHelp"
            v-if="list.indexOf('8') != -1 || list.indexOf(8) != -1"
          >团队帮扶</el-menu-item>
          <el-menu-item
            index="/helpFul/personHelp"
            v-if="list.indexOf('9') != -1 || list.indexOf(9) != -1"
          >个人帮扶</el-menu-item>
          <el-menu-item
            index="/helpFul/manageHelp"
            v-if="list.indexOf('10') != -1 || list.indexOf(10) != -1"
          >认领管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/manageWelfare" v-if="list.indexOf('4') != -1 || list.indexOf(4) != -1">
        <i class="el-icon-loading"></i>
        <span slot="title">公益管理</span>
      </el-menu-item>
      <el-menu-item
        index="/manageApplyReward"
        v-if="list.indexOf('5') != -1 || list.indexOf(5) != -1"
      >
        <i class="el-icon-loading"></i>
        <span slot="title">申请奖励金管理</span>
      </el-menu-item>
      <el-submenu index="/programSetting" v-if="list.indexOf('6') != -1 || list.indexOf(6) != -1">
        <template slot="title">
          <i class="el-icon-loading"></i>
          <span slot="title">项目配置管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            index="/programSetting/bannerSetting"
            v-if="list.indexOf('11') != -1 || list.indexOf(11) != -1"
          >首页Banner</el-menu-item>
          <el-menu-item
            index="/programSetting/reportSetting"
            v-if="list.indexOf('12') != -1 || list.indexOf(12) != -1"
          >公告管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/manageSystem" v-if="list.indexOf('7') != -1 || list.indexOf(7) != -1">
        <template slot="title">
          <i class="el-icon-loading"></i>
          <span slot="title">系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            index="/manageSystem/manageAuthority"
            v-if="list.indexOf('13') != -1 || list.indexOf(13) != -1"
          >权限管理</el-menu-item>
          <el-menu-item
            index="/manageSystem/manageAccount"
            v-if="list.indexOf('14') != -1 || list.indexOf(14) != -1"
          >账号管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import service from "@/api";
export default {
  data() {
    return {
      msg: "我的左侧的按钮"
    };
  },
  computed: {
    list() {
      return this.$store.state.menusLists;
    }
  }
};
</script>

<style lang="less" scoped>
.menuitem {
  padding: 0 !important;
}

.el-menu {
  border-right: none !important;
}
</style>
