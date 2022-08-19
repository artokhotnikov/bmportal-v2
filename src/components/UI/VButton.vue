<template>
  <button @click="$emit('click')" class="btn" :class="classes">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "VButton",
  props: {
    classes: {
      type: String,
      default: ''
    }
  },
  methods: {

  },
  emits: ['click']
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 4px;
  height: 56px;
  padding: 0 10px;
  transition: all 0.3s;
  font-size: 18px;

  &.secondary {
    background-color: $secondary;
    color: $white;

    &:hover {
      background-color: #EA3C41;
    }
  }

  &.outline-yellow {
    border: 2px solid;
    color: #F5D980;

    &:hover {
      color: $info;
    }
  }

  &:disabled {
    background-color: $muted;
    color: $white;
    pointer-events: none;
  }
}

</style>
