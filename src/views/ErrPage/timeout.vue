<template>
  <div class="page404">
    <img src="~@/assets/images/404.png" @click="backToRetry" alt="" />
  </div>
</template>
<script>
export default {
  name: 'page404',
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    backToRetry() {
      this.$router.back(-1)
    },
  },
}
</script>
<style lang="scss" scope>
.page404 {
  width: 100%;
  height: 100%;
  img {
    width: inherit;
    height: inherit;
  }
}
</style>
