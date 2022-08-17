<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: "VContainer"
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.container {
  max-width: 1520px;
  margin: 0 auto;
  position: relative;

  @media(max-width: 1560px) {
    max-width: 1160px;
  }
  @media(max-width: 1200px) {
    max-width: 100%;
    padding: 0 20px;
  }
  @media (max-width: 767px) {
    padding: 0 10px;
  }
}

</style>
