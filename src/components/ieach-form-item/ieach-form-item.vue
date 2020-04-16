<template>
  <div class="i-form-item" @click="handleClick">
    <div class="i-form-item__label" :style="{ flex: labelWidth }">
      {{ label }}
    </div>
    <div class="i-form-item__value">
      <slot name="content">
        <input
          :class="{ disabled: disabled }"
          :value="value"
          @input="inputVal"
          :disabled="disabled"
          :readonly="readonly"
          :placeholder="placeholder"
        />
      </slot>
    </div>
    <div v-if="withIcon" class="i-form-item__icon">
      <slot name="icon">
        <van-icon name="arrow" color="#BDBFC5" />
      </slot>
    </div>
  </div>
</template>
<script>
import { Icon } from "vant";
export default {
  name: "ieach-form-item",
  components: {
    [Icon.name]: Icon
  },
  props: {
    label: {
      default: "",
      type: String
    },
    value: {
      default: "",
      type: String
    },
    labelWidth: {
      default: 2,
      type: Number
    },
    placeholder: {
      default: "",
      type: String
    },
    disabled: {
      default: false,
      type: Boolean
    },
    readonly: {
      default: false,
      type: Boolean
    },
    withIcon: {
      default: false,
      type: Boolean
    }
  },
  model: {
    prop: "value",
    event: "returnValue"
  },
  methods: {
    inputVal(e) {
      this.$emit("returnValue", e.target.value);
    },
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>
<style lang="scss" scope>
.i-form-item {
  display: flex;
  font-size: 17px;
  border-bottom: 1px solid #e8e8e8;
  &:nth-last-child(1) {
    border-bottom: none;
  }
  .i-form-item__label {
    height: 48px;
    line-height: 48px;
    text-align: left;
    color: rgba(30, 35, 41, 1);
  }
  .i-form-item__value {
    flex: 4;
    height: 48px;
    line-height: 48px;
    font-size: 17px;

    div,
    input {
      height: 48px;
      width: 100%;
      line-height: 48px;
      color: #92969c;
      border: none;
      background-color: #f9f9f9;
      &.disabled {
        color: rgba(30, 35, 41, 1);
      }
      &:focus {
        outline: none;
      }
      &::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #999;
        font-size: 16px;
      }

      &::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #999;
        font-size: 16px;
      }

      &:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #999;
        font-size: 16px;
      }
    }
  }
  .i-form-item__icon {
    flex: 1;
    display: flex;
    justify-content: center;
    height: 48px;
    line-height: 48px;
    align-items: center;
  }
}
</style>
