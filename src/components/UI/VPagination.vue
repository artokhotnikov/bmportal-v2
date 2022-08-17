<template>
  <div class="pagination">
    <div class="pagination__start" :class="{muted: currentPage == 1}" @click="paginationStart">В начало</div>
    <div
      class="pagination__item"
      :class="{active: item == currentPage}"
      @click="paginationClick(item)"
      v-for="item in pageCount"
      :key="item"
    >
      {{ item }}
    </div>
    <div class="pagination__end" :class="{muted: currentPage == pageCount}" @click="paginationEnd">В конец</div>
  </div>
</template>

<script>

export default {
  name: "VPagination",
  props: {
    pageCount: {
      type: Number,
    },
    currentPage: {
      type: Number,
    }
  },
  methods: {
    paginationStart() {
      this.paginationClick(1);
    },
    paginationEnd() {
      this.paginationClick(this.pageCount);
    },
    paginationClick(item) {
      this.$emit('paginationClick', item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.pagination {
  display: flex;
  font-size: 14px;
  color: $black;

  &__start {
    margin-right: 10px;
    cursor: pointer;
    padding: 10px 0;

    &.muted {
      opacity: 0.3;
      pointer-events: none;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 14px;
    transition: background-color 0.3s;
    cursor: pointer;

    &.active {
      background: #F5D980;
      border-radius: 2px;
      color: $white;
      pointer-events: none;
    }
  }

  &__end {
    margin-left: 10px;
    cursor: pointer;
    padding: 10px 0;

    &.muted {
      opacity: 0.3;
      pointer-events: none;
    }
  }
}

@media (max-width: 540px) {
  .pagination {
    &__end, &__start {
      display: none;
    }
  }
}
</style>
