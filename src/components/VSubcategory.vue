<template>
  <div class="subcategory">
    <v-container v-if="width > 1200">
      <div @click="showPopup = true" class="subcategory__name">
        <div class="subcategory__img">
          <img v-if="imgThumb" :src="'https://dpn.bm-technology.ru'+imgThumb" alt="">
          <img v-else  src="@/assets/img/notfound.jpeg" alt="">
        </div>
        <span>{{ item.name }}</span>
      </div>
      <div class="subcategory__description">
        <p v-if="item.specification" v-html="createDiv(item.specification)"></p>
        <button @click="showPopup = true">Показать подробности</button>
      </div>
      <div class="subcategory__prices">
        <div class="subcategory__price"><span>РРЦ</span>
          {{ item.price ? 'от ' + Number(item.price).toLocaleString("ru") + ' ₽' : 'Цена по запросу' }}
        </div>
        <div class="subcategory__price"><span>Цена для дилера </span>
          {{
            itemDealerPrice(item.price, item.minPrice, discount)
          }}
        </div>
        <div class="subcategory__price"><span>Цена упаковки </span>{{
            item.packPrice ? Number(item.packPrice).toLocaleString("ru") + ' ₽' : 'Цена по запросу'
          }}
        </div>
      </div>
    </v-container>
    <v-container v-else>
      <div class="card">
        <div @click="showPopup = true" class="subcategory__name">
          <div class="subcategory__img">
            <img v-if="imgThumb" :src="'https://dpn.bm-technology.ru'+imgThumb" alt="">
            <img v-else  src="@/assets/img/notfound.jpeg" alt="">
          </div>
          <div class="category__header">
            <span>{{ item.name }}</span>
            <p @click="showPopup = !showPopup">{{ showPopup ? 'Скрыть' : 'Подробнее' }}</p>
          </div>
        </div>
        <div class="subcategory__prices">
          <div class="subcategory__price"><span>РРЦ</span>
            {{ item.price ? 'от ' + Number(item.price).toLocaleString("ru") + ' ₽' : 'Цена по запросу' }}
          </div>
          <div class="subcategory__price"><span>Цена для дилера </span>
            {{
              itemDealerPrice(item.price, item.minPrice, discount)
            }}
          </div>
          <div class="subcategory__price"><span>Цена упаковки </span>{{
              item.packPrice ? Number(item.packPrice).toLocaleString("ru") + ' ₽' : 'Цена по запросу'
            }}
          </div>
        </div>
      </div>

    </v-container>

    <v-popup :item="item" :description="description" @close="closePopup" v-if="showPopup"></v-popup>
  </div>
</template>

<script>
import VContainer from "@/components/VContainer";
import VPopup from "@/components/UI/VPopup";

export default {
  name: "VSubcategory",
  components: {VPopup, VContainer},
  props: {
    item: {
      type: Object,
      required: true,
    },
    description: {
      type: String,
    },
    discount: {
      type: Number,
    }
  },
  data() {
    return {
      showPopup: false,
      width: 0,
      showMore: false,
      imgThumb: null
    }
  },
  methods: {
    closePopup() {
      this.showPopup = false;
    },
    itemDealerPrice(price, minPrice, discount) {
      if (price) {
        if (minPrice > price - price * (discount / 100)) {
          return 'от ' + Number(minPrice).toLocaleString("ru") + ' ₽'
        } else {
          return 'от ' + Number(price - price * (discount / 100)).toLocaleString("ru") + ' ₽'
        }
      } else {
        return 'Цена по запросу'
      }
    },
    createDiv(item) {
      return item.join(', ')
    },
    getThumb() {
      this.imgThumb = this.item.images[0].imageThumb;
    }
  },

  beforeMount() {
    this.width = window.innerWidth;
  },
  mounted() {
    this.getThumb()
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";

.subcategory {
  .container {
    padding-top: 10px;
    display: grid;
    grid-template-columns: 4fr 4fr 4fr;
    padding-bottom: 5px;
    border-bottom: 1px solid #D6D8DF;
  }

  &__name {
    display: flex;
    align-items: flex-start;
    margin-right: 10px;
    cursor: pointer;

    span {
      font-weight: 700;
      font-size: 20px;
      max-width: 260px;
      line-height: 120%;
    }
  }

  &__img {
    width: 110px;
    height: 130px;
    padding-right: 10px;
    flex: 0 0 110px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__description {
    padding-right: 50px;
    position: relative;

    p {
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
      max-height: 80px;
      position: relative;
      margin: auto;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        display: block;
        width: 100%;
        background: linear-gradient(180deg, #fff 0%, rgba(63, 63, 64, 0) 200%);
        height: 80px;
        pointer-events: none;
        transform: rotate(180deg);
      }
    }


    button {
      position: absolute;
      bottom: 0;
      left: 0;
      color: $info;
      text-decoration: underline;
      transition: color 0.3s;
      z-index: 2;
      font-weight: 600;

      &:hover {
        color: #DFB918;
      }
    }
  }

  &__prices {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__price {
    font-weight: 700;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;

    span {
      font-size: 16px;
      width: 120px;
      font-weight: 400;
      display: inline-block;
      margin-right: 10px;
    }
  }
}

@media(max-width: 1200px) {
  .category .subcategory .container {
    display: flex;
    margin-left: 24px;
    border: none;
  }
  .subcategory .container {
    display: flex;
    border: none;
  }
  .subcategory__img {
    width: 130px;
    flex: 0 0 130px;
  }
  .subcategory__price {
    justify-content: flex-start;
  }
}

@media (max-width: 767px) {
  .subcategory {
    &__name {
      span {
        font-size: 17px;
      }
    }

    &__price {
      justify-content: space-between;
      font-size: 16px;
    }
  }
}
</style>
