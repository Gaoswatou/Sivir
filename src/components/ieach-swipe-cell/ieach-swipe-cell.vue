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
      <div class="i-swiper-cell__img">
        <slot name="img"></slot>
      </div>
      <div class="i-swiper-cell__info">
        <div class="i-swiper-cell__info-title">{{ title }}</div>
        <div class="i-swiper-cell__info-desc">{{ desc }}</div>
      </div>
      <div class="i-swiper-cell__status">
        <span>{{ status }}</span>
      </div>
    </div>
    <template v-if="useRight == 2" slot="right">
      <van-button
        square
        :type="rightBtnType1"
        :text="rightBtnText1"
        @click="rightBtnOneClick"
        style="height:100%"
      />
      <van-button
        square
        v-if="!useOneRight"
        :type="rightBtnType2"
        :text="rightBtnText2"
        @click="rightBtnTwoClick"
        style="height:100%"
      />
    </template>
    <template v-if="useRight == 1" slot="right">
      <van-button
        square
        :type="rightBtnType1"
        :text="rightBtnText1"
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
    rightBtnType1: {
      default: "info",
      type: String
    },
    rightBtnText1: {
      default: "删除",
      type: String
    },
    useOneRight: {
      default: false,
      type: Boolean
    },
    rightBtnType2: {
      default: "warning",
      type: String
    },
    rightBtnText2: {
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
    }
  }
};
</script>
<style lang="scss" scope>
.i-swiper-cell {
  height: 80px;
  display: flex;
  padding: 10px 20px;
  border-bottom: 1px solid $gray-3;
  &__img {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 48px;
      height: 48px;
    }
  }
  &__info {
    flex: 3;
    padding-left: 10px;
    &-title {
      color: $gray-8;
      font-size: 16px;
      height: 30px;
      line-height: 30px;
    }
    &-desc {
      color: $gray-6;
      font-size: 14px;
      height: 30px;
      line-height: 30px;
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
