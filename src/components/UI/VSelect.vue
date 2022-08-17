<template>
  <div class="dropdown">
    <v-button @click="toggleShow" :class="classes">{{ title }}</v-button>
    <transition name="fade">
      <div v-if="show" class="dropdown__list">
        <slot></slot>
        <div
          class="dropdown__item"
          v-for="item in list"
          :key="item.id"
          @click="selectOption(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import VButton from "@/components/UI/VButton";

export default {
  name: "VSelect",
  components: {VButton},
  props: {
    classes: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    list: {
      type: [Object, Array],
      required: true
    },
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    toggleShow() {
      this.show = !this.show
    },
    selectOption(item) {
      this.$emit('selected', item)
      this.show = false;
    },
    hideSelect() {
      this.show = false;
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.dropdown {
  position: relative;

  & + & {
    margin-left: 32px;
  }

  &__list {
    position: absolute;
    width: 360px;
    top: 110%;
    left: 0;
    z-index: 3;
    padding: 14px 0;
    background: $white;
    box-shadow: 0 4px 50px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
  }

  &__item {
    padding: 5px 14px;
    line-height: 120%;
    cursor: pointer;
    transition: all 0.3s;
    border-bottom: 1px solid #9E9E9E;

    &:hover {
      color: $info;
    }
  }
}

.btn {
  width: 230px;
  height: 40px;
  font-size: 14px;
}

.category {
  background-image: url('../../assets/img/category.svg');
  background-repeat: no-repeat;
  background-position: 50px 8px;
}

.subcategory {
  background-image: url('../../assets/img/subcategory.svg');
  background-repeat: no-repeat;
  background-position: 40px 6px;
}

@media (max-width: 1560px) {
  .btn {
    width: 150px;
  }
  .category {
    background-position: 12px 8px;
  }
  .subcategory {
    background-position: 3px 6px;
  }
}

@media (max-width: 767px) {
  .btn {
    width: 100%;
  }
  .dropdown {
    &__list {
      width: 100%;
    }
  }
}
</style>
