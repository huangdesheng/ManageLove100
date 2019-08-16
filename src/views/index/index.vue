<template>
  <div>
    <h2>{{msg}}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "欢迎您进入爱心100分业务综合管理后台"
    };
  }
};
</script>

<style lang="less" scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 94%;
  h2 {
    font-size: 0.5rem;
    color: #40d0b3;
    font-weight: 500;
    letter-spacing: 0.1rem;
  }
}
</style>
