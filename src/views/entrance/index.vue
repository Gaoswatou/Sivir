<template>
  <div class="home">
    <div class="entrance">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="48px"
        height="60px"
        viewBox="0 0 48 60"
        style="enable-background: new 0 0 100 100;"
        xml:space="preserve"
      >
        <rect x="0" y="9.22656" width="4" height="12.5469" fill="#FF6700">
          <animate
            attributeName="height"
            attributeType="XML"
            values="5;21;5"
            begin="0s"
            dur="0.6s"
            repeatCount="indefinite"
          ></animate>
          <animate
            attributeName="y"
            attributeType="XML"
            values="13; 5; 13"
            begin="0s"
            dur="0.6s"
            repeatCount="indefinite"
          ></animate>
        </rect>
        <rect x="10" y="5.22656" width="4" height="20.5469" fill="#FF6700">
          <animate
            attributeName="height"
            attributeType="XML"
            values="5;21;5"
            begin="0.15s"
            dur="0.6s"
            repeatCount="indefinite"
          ></animate>
          <animate
            attributeName="y"
            attributeType="XML"
            values="13; 5; 13"
            begin="0.15s"
            dur="0.6s"
            repeatCount="indefinite"
          ></animate>
        </rect>
        <rect x="20" y="8.77344" width="4" height="13.4531" fill="#FF6700">
          <animate
            attributeName="height"
            attributeType="XML"
            values="5;21;5"
            begin="0.3s"
            dur="0.6s"
            repeatCount="indefinite"
          ></animate>
          <animate
            attributeName="y"
            attributeType="XML"
            values="13; 5; 13"
            begin="0.3s"
            dur="0.6s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Entrance',
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scope>
.entrance {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
