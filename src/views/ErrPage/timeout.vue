<template>
  <div class="pagetimeout">
    <img src="~@/assets/images/timeout.png" @click="backToRetry" alt="" />
  </div>
</template>
<script>
export default {
  name: 'pagetimeout',
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
.pagetimeout {
  width: 100%;
  height: 100%;
  img {
    width: inherit;
    height: inherit;
  }
}
</style>
