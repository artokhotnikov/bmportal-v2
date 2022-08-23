<template>
  <header class="header">
    <v-container>
      <div class="logo">
        <img src="../assets/img/logo.png" alt="">
      </div>
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
      <form class="form" @submit.prevent="searchQuery">
        <v-input v-model.trim="search" label="Поиск по сайту" id="search"/>
        <button></button>
      </form>
      <v-user :user="user"/>
      <a @click.prevent="downloadFiles" href="#" class="download">
        <p>Скачать в формате Excel</p>
      </a>
      <a @click.prevent="downloadDealerFiles" href="#" class="zip">
        <p>
          Скачать дилерские материалы
          <span>Обновлено {{ dealerPriceDate }}</span>
        </p>
      </a>
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
    },
    token: {},
  },
  data() {
    return {
      search: '',
      isLoading: false,
      dealerPriceDate: ''
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
          baseURL: 'https://data.dealer.useful.su/api/excel_files',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
          data: JSON.stringify(this.listIds),
        });
        const url = 'https://data.dealer.useful.su/uploads/excel/' + response.data.excel;
        console.log(url)
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.pdf'); //or any other extension
        document.body.appendChild(link);
        link.click();
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false;
      }
    },
    downloadDealerFiles() {
      this.isLoading = true;
      try {
        axios({
          method: 'get',
          baseURL: `https://data.dealer.useful.su/api/material_dealers`,
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        })
          .then((response) => {
            const url = 'https://data.dealer.useful.su/uploads/files/' + response.data[0].archive;
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();
          })
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false;
      }
    },
    async preDownloadDealerFiles() {
      this.isLoading = true;
      try {
        const response = await axios({
          method: 'get',
          baseURL: `https://data.dealer.useful.su/api/material_dealers`,
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        });
        const date = new Date(response.data[0].updatedAt);
        this.dealerPriceDate = date.toLocaleDateString();


      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false;
      }
    }
  },
  beforeMount() {
    this.preDownloadDealerFiles()
  }
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
  width: 180px;
  flex: 0 0 180px;
  margin-right: 50px;

  img {
    width: 100%;
    height: 100%;
  }
}

.form {
  flex: 1 1 auto;
  position: relative;
  margin-left: 36px;

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
  margin-left: 36px;
}


.download {
  position: absolute;
  bottom: -88px;
  right: 0;
  height: 48px;
  padding-left: 56px;
  display: flex;
  align-items: center;
  background: url('../assets/img/xls.jpg') left/48px no-repeat;
  color: #4C4C4C;
  font-size: 16px;
  text-decoration: underline;
}

.zip {
  position: absolute;
  bottom: -88px;
  right: 250px;
  height: 48px;
  padding-left: 56px;
  display: flex;
  align-items: center;
  background: url('../assets/img/zip.png') left/48px no-repeat;
  color: #4C4C4C;
  font-size: 16px;
  text-decoration: underline;
  flex-wrap: wrap;
  width: 300px;

  span {
    flex: 0 0 100%;
    display: block;
    margin-top: 4px;
    color: #B2B2B2;
    font-size: 12px;
  }
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
    width: auto;

    p {
      display: none;
    }
  }
  .zip {
    bottom: auto;
    top: 1px;
    right: 150px;
    width: auto;

    p {
      display: none;
    }

  }
  .user {
    margin-left: auto;
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
    width: 150px;
    flex: 0 0 150px;
  }
  .download {
    top: 0;
    right: 60px;
    width: 32px;
    height: 32px;
    background-size: 32px;
    padding-left: 32px;
  }
  .zip {
    height: 32px;
    top: 0;
    right: 105px;
    background-size: 32px;
    padding-left: 32px;
  }

}
</style>
