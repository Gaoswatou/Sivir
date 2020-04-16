<template>
  <div class="i-cell">
    <slot name="container">
      <div class="i-cell__title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="i-cell__content">
        <slot name="content">
          内容区域
        </slot>
      </div>
    </slot>
  </div>
</template>
<script>
export default {
  name: "ieach-cell",
  props: {
    type: {
      default: "radio",
      type: String
    },
    title: {
      default: "",
      type: String
    }
  }
};
</script>
<style lang="scss" scope>
.i-cell {
  display: flex;
  height: auto;
  padding: 10px 0;
  border-bottom: 1px solid #e8e8e8;
  &:nth-last-child(1) {
    border-bottom: none;
  }
}
.i-cell__title {
  flex: 1;
  color: #92969c;
}
.i-cell__content {
  flex: 1;
  position: relative;
  display: flex;
  flex-wrap: wrap;
}
</style>
