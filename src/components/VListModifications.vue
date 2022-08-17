<template>
  <div class="list">
    <div class="list__header">
      <v-container>
        <div class="list__name">Название оборудования</div>
        <div class="list__description">Описание</div>
        <div class="list__dealer">Цены</div>
      </v-container>
    </div>
    <div class="list__content">
      <transition-group name="slide-fade">
        <v-subcategory
          v-for="item in list"
          :key="item.id"
          :item="item"
          :description="item.description"
          :discount="discount"
        >
        </v-subcategory>
      </transition-group>
    </div>
  </div>
</template>

<script>
import VContainer from "@/components/VContainer";
import VSubcategory from "@/components/VSubcategory";
import VPagination from "@/components/UI/VPagination";

export default {
  name: "VListModifications",
  components: {VPagination, VSubcategory, VContainer},
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

<style scoped>
.list__header .container {
  display: flex;
}

.list__name {
  flex: 0 1 33%;
}

.list__description {
  flex: 0 1 42%;
}
</style>
