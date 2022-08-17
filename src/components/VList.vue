<template>
  <div class="list">
    <div class="list__header">
      <v-container>
        <div class="list__name">Название оборудования</div>
        <div class="list__description">Описание</div>
        <div class="list__rrc">РРЦ</div>
        <div class="list__dealer">Цена для дилера</div>
      </v-container>
    </div>
    <div class="list__content">
      <transition-group name="slide-fade">
        <v-category
          v-for="item in list"
          :key="item.id"
          :item="item"
          :discount="discount"
        ></v-category>
      </transition-group>
    </div>
  </div>
</template>

<script>
import VContainer from "@/components/VContainer";
import VPagination from "@/components/UI/VPagination";
import VCategory from "@/components/VCategory";

export default {
  name: "VList",
  components: {VCategory, VPagination, VContainer},
  props: {
    list: {
      type: [Array, Object],
      default: () => [],
      required: true
    },
    discount: {
      type: Number,
    }
  },
}
</script>

<style lang="scss">
@import '../assets/scss/variables';

.list {

  &__header {
    margin-bottom: 16px;

    .container {
      display: grid;
      grid-template-columns: 4fr 4fr 2fr 2fr;
      border-bottom: 1px solid #D6D8DF;
      padding-bottom: 5px;
    }
  }
}

@media (max-width: 1200px) {
  .list {
    &__header {
      display: none;
    }
  }
}
</style>
