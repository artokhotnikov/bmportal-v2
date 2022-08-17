<template>
  <header class="header">
    <v-container>
      <div class="logo">
        <img src="../assets/img/logo.png" alt="">
      </div>
      <form class="form" @submit.prevent="searchQuery">
        <v-input v-model="search" label="Поиск по сайту" id="search"/>
        <button></button>
      </form>
      <div class="header__filters">
        <v-select
          @selected="selectedCategory"
          :list="categoryList"
          classes="secondary category"
          title="Категории"
        >
          <div class="dropdown__item" @click="showAllCategory">Все категории</div>
        </v-select>
        <v-select
          v-if="selectedCat"
          :list="selectedCat"
          @selected="selectedSubCategory"
          classes="outline-yellow subcategory"
          title="Подкатегории"
        />
      </div>
      <v-user :user="user"/>
      <a @click.prevent="downloadFiles" href="#" class="download"></a>
    </v-container>
    <v-loader v-if="isLoading"/>
  </header>
</template>

<script>
import VContainer from "@/components/VContainer";
import VInput from "@/components/UI/VInput";
import VButton from "@/components/UI/VButton";
import VUser from "@/components/VUser";
import VSelect from "@/components/UI/VSelect";
import VLoader from "@/components/UI/VLoader";
import axios from "axios";

export default {
  name: "VHeader",
  components: {VLoader, VSelect, VUser, VButton, VInput, VContainer},
  props: {
    user: {
      type: Object,
      required: true,
    },
    categoryList: {
      type: [Array, Object],
      required: true,
    },
    selectedCat: {},
    listIds: {
      type: [Array, Object],
      required: true,
    }
  },
  data() {
    return {
      search: '',
      isLoading: false,
    }
  },
  methods: {
    selectedCategory(item) {
      this.$emit('selectedCategory', item)
    },
    selectedSubCategory(item) {
      this.$emit('selectedSubCategory', item)
    },
    searchQuery() {
      this.$emit('searchQuery', this.search)
    },
    showAllCategory() {
      this.$emit('showAllCategory')
    },
    async downloadFiles() {
      this.isLoading = true;
      try {
        const response = await axios({
          method: 'post',
          baseURL: 'https://www.axios.ru/',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          data: JSON.stringify(this.listIds),
        });

      } catch (e) {

      } finally {
        this.isLoading = false;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.header {
  padding: 40px 0 0;
  margin-bottom: 120px;

  &__filters {
    display: flex;
  }
}

.container {
  display: flex;
  align-items: center;
}

.logo {
  width: 243px;
  flex: 0 0 243px;
  margin-right: 50px;

  img {
    width: 100%;
    height: 100%;
  }
}

.form {
  flex: 0 0 380px;
  position: relative;
  margin-right: 180px;

  button {
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
    width: 14px;
    height: 14px;
    display: block;
    background: url('../assets/img/search.svg') center / contain no-repeat;
  }

  @media(max-width: 1560px) {
    margin-right: 40px;
  }
}


.user {
  margin-left: auto;
}


.download {
  position: absolute;
  bottom: -88px;
  right: 0;
  width: 48px;
  height: 48px;
  display: block;
  background: url('../assets/img/xls.jpg') center/cover no-repeat;
}

.dropdown__item {
  padding: 5px 14px;
  line-height: 120%;
  cursor: pointer;
  transition: all 0.3s;
  border-bottom: 1px solid #9E9E9E;

  &:hover {
    color: $info;
  }
}

@media (max-width: 1200px) {
  .header {
    margin-bottom: 24px;
  }
  .logo {
    margin-right: 24px;
  }
  .container {
    flex-wrap: wrap;
  }
  .form {
    flex: 0 0 100%;
    order: 2;
    margin: 20px 0 0;
  }
  .download {
    bottom: auto;
    top: 1px;
    right: 80px;
  }
}

@media (max-width: 767px) {
  .header {
    &__filters {
      flex: 0 0 100%;
      margin-top: 24px;
      order: 1;
      flex-wrap: wrap;
    }
  }
  .dropdown {
    display: inline-block;
    width: 100%;

    & + & {
      margin: 12px 0 0;
    }
  }
}

@media (max-width: 540px) {
  .header {
    padding: 12px 0 0;
  }
  .logo {
    width: 180px;
    flex: 0 0 180px;
  }
  .download {
    top: 3px;
    right: 60px;
    width: 32px;
    height: 32px;
  }
}
</style>
