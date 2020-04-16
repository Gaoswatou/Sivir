<template>
  <div class="coms" v-if="showDialog">
    <div class="overlay"></div>
    <div class="i-dialog">
      <div class="i-dialog-header">{{ title }}</div>
      <div class="i-dialog-body">
        <slot name="content">
          <div>对话框内容</div>
        </slot>
      </div>
      <div class="i-dialog-footer">
        <div class="i-dialog-footer__btn cancle" @click="beforeClose('cancle')">
          取消
        </div>
        <div
          class="i-dialog-footer__btn confirm"
          @click="beforeClose('confirm')"
        >
          {{ confirmText }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ieach-dialog",
  props: {
    showDialog: {
      default: false,
      type: Boolean
    },
    title: {
      default: "对话窗",
      type: String
    },
    confirmText: {
      default: "确定",
      type: String
    },
    cancleText: {
      default: "取消",
      type: String
    }
  },
  model: {
    prop: "showDialog",
    event: "returnShowDialog"
  },
  methods: {
    beforeClose(action) {
      this.$emit("before-close", action, (isCloseDialog = true) => {
        if (isCloseDialog) {
          this.$emit("returnShowDialog", false);
        }
      });
    }
  }
};
</script>
<style lang="scss" scope>
.coms {
  display: flex;
  align-items: center; /*定义body的元素垂直居中*/
  justify-content: center; /*定义body的里的元素水平居中*/
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2038;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.i-dialog {
  height: auto;
  width: 80%;
  height: 75%;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 2039;
  border-radius: 6px;
  background-color: #fff;
}
.i-dialog-header {
  height: 53px;
  padding-top: 22px;
  font-size: 18px;
  font-weight: 400;
  color: rgba(30, 35, 41, 1);
  text-align: center;
}
.i-dialog-body {
  padding: 0 17px;
  height: calc(100% - 131px);
}
.i-dialog-footer {
  height: 78px;
  display: flex;
  justify-content: space-around;
  padding: 0 30px;
}
.i-dialog-footer__btn {
  width: 42%;
  height: 44px;
  height: 44px;
  line-height: 44px;
  font-size: 18px;
  border-radius: 5px;
  margin-top: 13px;
  text-align: center;
  &.cancle {
    color: rgba(47, 52, 59, 1);
    background-color: #fff;
    border: 1px solid rgba(189, 192, 197, 1);
  }
  &.confirm {
    color: #fff;
    background: rgba(82, 199, 202, 1);
    border: 1px solid rgba(82, 199, 202, 1);
  }
}
</style>
