<template>
  <div>
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="$route.fullPath" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
div {
  width: 100%;
  height: 94%;
  background: #fff;
}
</style>



