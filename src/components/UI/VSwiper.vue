<template>
  <div class="swiper" ref="swiper">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div class="swiper-slide" v-for="item in list" :key="item.id">
        <img :src="'https://dpn.bm-technology.ru/uploads/images/'+item" alt="">
      </div>
    </div>
    <!-- If we need pagination -->
    <div class="swiper-pagination" ref="pagination"></div>
    <!-- If we need navigation buttons -->
    <div class="swiper-button-prev" ref="prev"></div>
    <div class="swiper-button-next" ref="next"></div>

  </div>
</template>

<script>
// import Swiper JS
import Swiper, {Navigation, Pagination} from 'swiper';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default {
  name: "VSwiper",
  props: {
    list: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      swiper: this.$refs.swiper,
    }
  },
  methods: {
    createSwiper() {
      const swiper = new Swiper(this.$refs.swiper, {
        // configure Swiper to use modules
        modules: [Navigation, Pagination],
        loop: false,
        autoHeight: false,

        // If we need pagination
        pagination: {
          el: this.$refs.pagination,
          clickable: true,
        },

        // Navigation arrows
        navigation: {
          nextEl: this.$refs.next,
          prevEl: this.$refs.prev,
        },

      });
    }
  },
  mounted() {
    this.createSwiper()
  }
}
</script>

<style lang="scss">
.swiper {
  width: 500px
}

.swiper-wrapper {
  align-items: center;
}

.swiper-slide {
  text-align: center;
  padding-top: 95%;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.swiper-pagination {
  position: static !important;
  margin: 20px auto 0 !important;
  width: 80% !important;
}

.swiper-pagination-bullet {
  width: 16px !important;
  height: 16px !important;
  background: #ccc !important;
  border-radius: 0 !important;
}

.swiper-pagination-bullet-active {
  background: #FFE267 !important;
}

.swiper-button-next, .swiper-button-prev {
  top: auto !important;
  bottom: 8px;
}

.swiper-button-next:after,
.swiper-rtl .swiper-button-prev:after,
.swiper-button-prev:after,
.swiper-rtl .swiper-button-next:after {
  content: '' !important;
}

.swiper-button-next, .swiper-button-prev {
  width: 19px !important;
  height: 8px !important;
  background: url('../../assets/img/arrow.svg') no-repeat;
}

.swiper-button-next {
  transform: rotate(180deg);
}

@media (max-width: 1560px) {
  .swiper {
    width: 350px;
  }
}

@media (max-width: 540px) {

  .swiper {
    width: 100%;
  }
}
</style>
