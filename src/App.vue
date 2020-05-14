<template>
  <div id="app">
    <ieach-nav-bar
      v-if="navTitle"
      @click-left="routerBack"
      :title="navTitle"
      :left-arrow="!hiddenBackFlag"
    >
      <p slot="right">
        <span class="exitApp" v-if="showClose" @click.stop="exitApp">关闭</span>
      </p>
    </ieach-nav-bar>
    <router-view />
  </div>
</template>
<script>
export default {
  computed: {
    navTitle() {
      return this.$store.state.navTitle
    },
    hiddenBackFlag() {
      return this.$store.state.hiddenBackFlag
    },
    showClose() {
      return localStorage.getItem('env') === 'wisedu'
    },
  },
  mounted() {},
  methods: {
    routerBack() {
      if (this.$route.query.index == '1') {
        // 如果是最上级页面，点击返回则退出应用
        localStorage.getItem('env') === 'wisedu' ? this.exitApp() : ''
      } else {
        this.$router.back(-1)
      }
    },
    exitApp() {
      document.addEventListener('deviceready', () => {
        // 所有JSAPI须在此之后调用
        window._campus.closeWindow({
          refresh: true, //是否刷新上级页面
          toDeep: 0, //返回到上几级页面，返回上级传1，上上级传2，上上上级传3，最外层传0，超出页面深度相当于0
          success: function () {},
          fail: function () {},
        })
      })
    },
  },
}
</script>
<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body,
html {
  height: 100%;
}

#app {
  font-family: PingFangSC-Regular, PingFang SC, Avenir, Helvetica, Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
  height: 100%;
  background-color: $bg-color;
}
.home {
  height: calc(100% - 46px);
  position: relative;
}
.exitApp {
  font-size: 15px;
  display: inline-block;
  height: 46px;
  line-height: 46px;
  margin-left: 10px;
}
</style>
