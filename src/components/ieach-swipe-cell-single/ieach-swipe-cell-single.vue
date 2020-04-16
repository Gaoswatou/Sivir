<template>
  <van-swipe-cell>
    <template v-if="useLeft" slot="left">
      <van-button
        square
        :type="leftBtnType"
        :text="leftBtnText"
        style="height:100%"
        @click="leftBtnClick"
      />
    </template>
    <div class="i-swiper-cell">
      <div class="i-swiper-cell__label">
        {{ title }}
      </div>
      <div class="i-swiper-cell__info">
        <div class="i-swiper-cell__info-desc">{{ desc }}</div>
      </div>
      <slot name="status">
        <div v-if="status" @click="statusClick" class="i-swiper-cell__status">
          <span>{{ status }}</span>
        </div>
      </slot>
    </div>
    <template v-if="useRight == 2" slot="right">
      <van-button
        square
        :type="rightBtnOneType"
        :text="rightBtnOneText"
        @click="rightBtnOneClick"
        style="height:100%"
      />
      <van-button
        square
        v-if="!useOneRight"
        :type="rightBtnTwoType"
        :text="rightBtnTwoText"
        @click="rightBtnTwoClick"
        style="height:100%"
      />
    </template>
    <template v-if="useRight == 1" slot="right">
      <van-button
        square
        :type="rightBtnOneType"
        :text="rightBtnOneText"
        @click="rightBtnOneClick"
        style="height:100%"
      />
    </template>
  </van-swipe-cell>
</template>
<script>
export default {
  name: "ieach-swipe-cell",
  props: {
    useLeft: {
      default: false,
      type: Boolean
    },
    leftBtnType: {
      default: "info",
      type: String
    },
    leftBtnText: {
      default: "选择",
      type: String
    },
    useRight: {
      default: 0,
      type: Number
    },
    rightBtnOneType: {
      default: "info",
      type: String
    },
    rightBtnOneText: {
      default: "删除",
      type: String
    },
    useOneRight: {
      default: false,
      type: Boolean
    },
    rightBtnTwoType: {
      default: "warning",
      type: String
    },
    rightBtnTwoText: {
      default: "收藏",
      type: String
    },
    title: {
      default: "",
      type: String
    },
    desc: {
      default: "",
      type: String
    },
    status: {
      default: "",
      type: String
    }
  },
  methods: {
    leftBtnClick() {
      this.$emit("leftBtnClick", 1);
    },
    rightBtnOneClick() {
      this.$emit("rightBtnOneClick", 2);
    },
    rightBtnTwoClick() {
      this.$emit("rightBtnTwoClick", 3);
    },
    statusClick() {
      this.$emit("statusClick");
    }
  }
};
</script>
<style lang="scss" scope>
.i-swiper-cell {
  height: 44px;
  display: flex;
  padding: 0 20px;
  border-bottom: 1px solid $gray-3;
  &__label {
    flex: 2;
    color: $gray-8;
    font-size: 16px;
    height: 44px;
    line-height: 44px;
  }
  &__info {
    flex: 3;
    padding-left: 10px;
    &-desc {
      color: $gray-8;
      font-size: 16px;
      height: 44px;
      line-height: 44px;
    }
  }
  &__status {
    flex: 3;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    span {
      width: auto;
      text-align: center;
      display: inline-block;
      padding: 0 10px;
      height: 28px;
      line-height: 28px;
      font-size: 12px;
      color: $green;
      background-color: rgba(82, 199, 202, 0.1);
      border-radius: 14px;
      border: 1px solid $green;
    }
  }
}
</style>
