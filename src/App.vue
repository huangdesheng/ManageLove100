<style>
</style>
<template>
  <div class="container">
    <Header></Header>
    <div class="tabBar">
      <asideleft></asideleft>
      <el-main id="main">
        <div class="titleRight">
          <span></span>
          <span>{{$router.history.current.meta.title}}</span>
        </div>
        <transition name="fade-transform" mode="out-in">
          <!-- <keep-alive> -->
          <router-view :key="$route.fullPath" />
          <!-- </keep-alive> -->
        </transition>
      </el-main>
    </div>
  </div>
</template>

<script>
import Header from "./components/header";
import asideleft from "./components/asideLeft";
export default {
  components: {
    Header,
    asideleft
  },
  mounted() {}
};
</script>

<style lang="less">
@import "./styles/site.less";
@tabBar-red-style: #fff;
.container {
  width: 100%;
  height: 100%;
  background: @tabBar-red-style;
  position: absolute;
  left: 0;
  top: 0;
  .tabBar {
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: space-between;
    #main {
      padding: 0 !important;
      height: 100%;
      .titleRight {
        width: 100%;
        height: 6%;
        background: #fff;
        display: flex;
        align-items: center;
        padding: 0 1%;
        span {
          font-size: 0.3rem;
          &:nth-of-type(1) {
            width: 2px;
            height: 25%;
            background: #40d0b3;
            margin-right: 0.1rem;
          }
        }
      }
    }
  }
}
</style>
