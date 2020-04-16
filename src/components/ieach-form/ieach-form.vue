<template>
  <div class="i-form">
    <slot name="title">
      <div :class="['i-form__title', size]" :style="{ color: color }">
        {{ iFormTitle }}
      </div>
    </slot>
    <div class="i-form__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "ieach-form",

  props: {
    title: {
      default: "标题",
      type: String
    },
    size: {
      default: "medium",
      type: String
    },
    color: {
      default: "rgba(30, 35, 41, 1)",
      type: String
    }
  },
  data() {
    return {
      iFormTitle: this.title
    };
  }
};
</script>
<style lang="scss" scope>
.i-form {
  .i-form__title {
    padding-left: 20px;
    text-align: left;
    &.small {
      font-size: 14px;
      height: 37px;
      line-height: 37px;
    }
    &.medium {
      font-size: 17px;
      height: 48px;
      line-height: 48px;
    }
  }
  .i-form__content {
    padding-left: 20px;
    border-top: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
  }
}
</style>
