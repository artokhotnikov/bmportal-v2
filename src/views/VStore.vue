<template>
  <div>
  <v-header
    :user="user"
    :categoryList="categoryList"
    @selectedCategory="fetchSubcategory"
    @selectedSubCategory="fetchModifications"
    :selectedCat="selectedCat"
    @searchQuery="searchInList"
    @showAllCategory="fetchAll"
    :list-ids="listIDs"
  />
  <v-list-modifications
    :list="newList"
    :discount="discount"
    v-if="isModifications"
  />
  <v-list
    v-else-if="!isModifications"
    :list="newList"
    :discount="discount"
  />
  <div class="empty" v-if="newList.length <=0"> - Совпадений не найдено -</div>
  <div v-if="!newList.length <=0" class="footer">
    <v-container>
      <div class="show-count">
        <span>Показывать по</span>
        <select @change="setCurrentPage(1)" v-model="perPage" class="select" name="count" id="count">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
      <v-pagination
        @paginationClick="setCurrentPage"
        :page-count="pageCount"
        :currentPage="currentPage"
      />
      <div class="counter">
        Показаны <span>{{
          paginationOffset + 1
        }}-{{ paginationOffset + 10 > list.length ? list.length : paginationOffset + 10 }}</span> из
        <span>{{ list.length }}</span>
        записей
      </div>
    </v-container>
  </div>
  <v-loader v-if="isLoading"/>
  </div>
</template>

<script>
import VHeader from "@/components/VHeader";
import VList from "@/components/VList";
import axios from "axios";
import VLoader from "@/components/UI/VLoader";
import VContainer from "@/components/VContainer";
import VSubcategory from "@/components/VSubcategory";
import {mapActions} from "vuex";
import VListModifications from "@/components/VListModifications";
import VPagination from "@/components/UI/VPagination";

export default {
  name: "VStore",
  components: {VPagination, VListModifications, VSubcategory, VContainer, VLoader, VList, VHeader},
  data() {
    return {
      user: {},
      list: [],
      token: '',
      isLoading: false,
      categoryList: [],
      selectedCat: '',
      isModifications: false,
      searchString: '',
      perPage: 10,
      currentPage: 1,
      paginationOffset: 0,
      newList: [],
      discount: 0,
      listIDs: {},
    }
  },
  methods: {
    ...mapActions(['loginUser']),
    async fetchUserData() {
      this.isLoading = true;
      try {
        const response = await axios({
          method: 'get',
          baseURL: 'https://data.dealer.useful.su/api/user_info',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        })
        this.user = response.data;
        this.discount = this.user.discountLevel.discount
      } catch (e) {
        if (e.response.data.message == "Expired JWT Token" || e.response.data.message == "Invalid JWT Token") {
          console.log('Токен стух');
          this.loginUser({token: ''});
          this.$router.push({name: 'main'})
        }
      } finally {
        this.isLoading = false;
      }
    },
    async fetchList() {
      this.isLoading = true;
      this.isModifications = false;
      try {
        const response = await axios({
          method: 'get',
          baseURL: 'https://data.dealer.useful.su/api/sub_categories',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        })
        localStorage.setItem('BMList', JSON.stringify(response.data));
        this.list = response.data;
        this.setCurrentPage(1)
      } catch (e) {
        if (e.response.data.message == "Expired JWT Token" || e.response.data.message == "Invalid JWT Token") {
          console.log('Токен стух');
          this.loginUser({token: ''});
          this.$router.push({name: 'main'})
        }
      } finally {
        this.isLoading = false;
      }

    },
    async fetchSubcategory(item) {
      this.selectedCategory = '';
      this.isModifications = false;
      this.isLoading = true;
      try {
        const response = await axios({
          method: 'get',
          baseURL: `https://data.dealer.useful.su/api/categories/${item.id}/sub_categories`,
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        })
        this.list = response.data;
        this.selectedCat = response.data;
        this.setCurrentPage(1);
        this.currentPage = 1;
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false;
      }
    },
    async fetchCategory() {
      this.isLoading = true;
      this.isModifications = false;
      try {
        const response = await axios({
          method: 'get',
          baseURL: 'https://data.dealer.useful.su/api/categories',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        })
        this.categoryList = response.data;
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false;
      }

    },
    async fetchModifications(item) {
      this.isModifications = true;
      this.isLoading = true;
      try {
        const response = await axios({
          method: 'get',
          baseURL: `https://data.dealer.useful.su/api/sub_categories/${item.id}/modifications`,
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,
          },
        })
        this.list = response.data;
        this.setCurrentPage(1);
        this.currentPage = 1;
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false;
      }
    },
    async fetchAll() {
      await this.fetchList()
      this.selectedCat = ''
    },
    async searchInList(string) {
      this.isLoading = true;
      this.isModifications = false;
      this.selectedCat = '';
      this.newList = await JSON.parse(localStorage.getItem('BMList'));
      this.searchString = string;
      this.list = this.sortedList;
      setTimeout(() => {
        this.isLoading = false;
        this.setCurrentPage(1);
      }, 1000)

    },
    setCurrentPage(pageNum = 1, scroll) {
      this.currentPage = pageNum;
      this.paginationOffset = (this.perPage * this.currentPage) - this.perPage;
      this.newList = [...this.list].splice(this.paginationOffset, this.perPage);
      if (scroll) {
        window.scrollTo(0, 0)
      }
    }
  },
  computed: {
    sortedList() {
      return [...this.newList].filter(item => item.name.toLowerCase().includes(this.searchString.toLowerCase()))
    },
    pageCount() {
      return Math.ceil(this.list.length / this.perPage)
    },
  },
  beforeMount() {
    this.token = this.$store.getters.token;
    this.fetchUserData()
    this.fetchList();
    this.fetchCategory();
  },
  mounted() {
    console.log(this.newList)
  },
  watch: {
    newList() {
      if (this.isModifications) {
        this.listIDs.name = 'modifications';
      } else {
        this.listIDs.name = 'subcategory';
      }
      this.listIDs.ids = this.newList.map(item => item.id)
    }
  }

}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.footer {
  padding: 54px 0 100px;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

}

.show-count {
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.select {
  background: $white;
  border: 1px solid #D9D9D9;
  border-radius: 4px;
  padding: 4px 8px;
}

.counter {
  span {
    font-weight: 700;
  }
}

.empty {
  text-align: center;
  padding: 40px 0;
  font-size: 24px;
}

@media (max-width: 1200px) {
  .pagination {
    flex: 0 0 100%;
    order: -1;
    justify-content: center;
    margin-bottom: 24px;
  }
}

@media (max-width: 540px) {
  .show-count, .select {
    font-size: 12px;
  }
  .counter {
    font-size: 14px;
  }
}
</style>
