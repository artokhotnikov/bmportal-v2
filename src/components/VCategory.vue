<template>
  <div class="category">
    <v-container v-if="width > 1200">
      <div class="category__name">
        <div @click="fetchSubcategory(item.id)" class="category__subcategory" :class="{active: show}"></div>
        <div class="category__img">
          <img :src="'https://data.dealer.useful.su/uploads/images/thumb/'+item.images[0]" alt="">
        </div>
        <span>{{ item.name }}</span>
      </div>

      <div class="category__description" v-html="item.description"></div>
      <div class="category__price">
        <div class="category__rrc">
          {{ item.minPrice ? 'от ' + Number(item.minPrice).toLocaleString("ru") + ' ₽' : 'Цена по запросу' }}
        </div>
        <div class="category__dealer">
          {{
            item.minPrice ? 'от ' + Number(item.minPrice - item.minPrice * (discount / 100)).toLocaleString("ru") + ' ₽' : 'Цена по запросу'
          }}
        </div>
      </div>
    </v-container>
    <v-container v-else>
      <div class="card">
        <div class="category__name">
          <div @click="fetchSubcategory(item.id)" class="category__subcategory" :class="{active: show}"></div>
          <div class="category__img">
            <img :src="'https://data.dealer.useful.su/uploads/images/thumb/'+item.images[0]" alt="">
          </div>
          <div class="category__header">
            <span>{{ item.name }}</span>
            <p @click="showMore = !showMore">{{ showMore ? 'Скрыть' : 'Подробнее' }}</p>
          </div>
        </div>
      </div>
      <transition name="slide-fade">
        <div v-if="showMore">
          <div class="card__title">Описание</div>
          <div class="category__description" v-html="item.description"></div>
          <div class="category__price">
            <div class="category__rrc">
              <span>РРЦ: </span>
              {{ item.minPrice ? 'от ' + Number(item.minPrice).toLocaleString("ru") + ' ₽' : 'Цена по запросу' }}
            </div>
            <div class="category__dealer">
              <span>Цена для дилера: </span>
              {{
                item.minPrice ? 'от ' + Number(item.minPrice - item.minPrice * (discount / 100)).toLocaleString("ru") + ' ₽' : 'Цена по запросу'
              }}
            </div>
          </div>
        </div>
      </transition>
    </v-container>
    <transition-group name="slide-fade">
      <v-subcategory
        v-if="show"
        v-for="subitem in list"
        :key="subitem.id"
        :item="subitem"
        :description="item.description"
        :discount="discount"
      >
      </v-subcategory>
    </transition-group>
    <v-loader v-if="isLoading"></v-loader>
  </div>

</template>

<script>
import VContainer from "@/components/VContainer";
import VSubcategory from "@/components/VSubcategory";
import VLoader from "@/components/UI/VLoader";
import axios from "axios";

export default {
  name: "VCategory",
  props: {
    item: {
      type: Object,
      default: true
    },
    discount: {
      type: Number,
    },
  },
  methods: {
    async fetchSubcategory(id) {
      if (this.show == false) {
        this.isLoading = true;
        try {
          const response = await axios({
            method: 'get',
            baseURL: `https://data.dealer.useful.su/api/sub_categories/${id}/modifications`,
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${this.token}`,
            },
          })
          this.list = response.data;
          this.show = true;
          console.log(response)
        } catch (e) {
          console.log(e)
        } finally {
          this.isLoading = false;
        }
      } else {
        this.show = false
      }
    }
  },
  components: {VLoader, VSubcategory, VContainer},
  data() {
    return {
      show: false,
      token: '',
      isLoading: false,
      list: [],
      width: 0,
      showMore: false
    }
  },
  beforeMount() {
    this.token = this.$store.getters.token;
    this.width = window.innerWidth;
  },
}
</script>

<style lang="scss">
.category {
  padding-top: 10px;
  max-width: 1520px;
  margin: 0 auto;

  .subcategory {
    .container {
      max-width: 1240px;
      margin: 0 0 0 auto;
    }
  }

  & > .container {
    display: grid;
    grid-template-columns: 4fr 4fr 4fr;
    padding-bottom: 5px;
    border-bottom: 1px solid #D6D8DF;
  }

  &__name {
    display: flex;
    align-items: flex-start;

    span {
      font-weight: 700;
      font-size: 20px;
      max-width: 260px;
      line-height: 120%;
    }
  }

  &__subcategory {
    width: 20px;
    height: 20px;
    background: url('../assets/img/chevron.svg') center / auto no-repeat;
    position: relative;
    top: 50%;
    left: 0;
    transform: translateY(-50%) rotate(-90deg);
    cursor: pointer;
    transition: all 0.3s;

    &.active {
      transform: translateY(-50%) rotate(0deg);
    }
  }

  &__img {
    width: 150px;
    height: 160px;
    flex: 0 0 150px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__description {
    padding-right: 30px;
  }

  &__price {
    display: flex;
  }

  &__rrc {
    font-weight: 700;
    font-size: 20px;
    flex: 1 1 auto;
  }

  &__dealer {
    font-weight: 700;
    font-size: 20px;
    flex: 1 1 auto;
  }
}


@media (max-width: 1560px) {
  .category {

    .subcategory {
      max-width: 1160px;
      margin: 0 auto;

      .container {
        max-width: 1100px;
        margin: 0 0 0 auto;
      }
    }
  }
}

@media (max-width: 1200px) {
  .category > .container {
    padding-bottom: 0;
    border: none;
    display: flex;
    flex-wrap: wrap;
  }
  .category__subcategory {
    align-self: center;
  }
  .card {
    padding: 12px;
    background: #F5F5F5;
    flex: 0 0 100%;
  }
  .card__title {
    font-weight: 700;
    font-size: 24px;
    margin: 24px 0 12px;
  }
  .category__price {
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
  }
  .category__header {
    margin-left: 24px;
  }
  .category__header p {
    margin-top: 12px;
    text-decoration: underline;
  }
  .category__rrc span,
  .category__dealer span {
    display: inline-block;
    margin-right: 12px;
    width: 160px;
    font-weight: 400;
  }
}

@media (max-width: 767px) {
  .category {
    &__description {
      font-size: 14px;
    }

    &__rrc,
    &__dealer {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
    }
  }
}
</style>
