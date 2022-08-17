<template>
  <div class="user" v-if="user">
    <div @click="show = !show" class="user__button">
      <img src="../assets/img/user.svg" alt="">
    </div>
    <transition name="fade">
      <div v-if="show" class="user__body">
        <div class="user__row">
          <div class="user__title">Данные о&nbspкомпании</div>
          <div class="user__content">
            <p v-if="user.companyName">{{user.companyName}}</p>
            <p v-if="user.companyTin">{{user.companyTin}}</p>
            <p v-if="user.email">{{user.email}}</p>
            <p v-if="user.userFio">{{user.userFio}}</p>
            <p v-if="user.userPhone">{{user.userPhone}}</p>
          </div>
        </div>
        <div class="user__row" v-if="user.discountLevel">
          <div class="user__title">Скидка</div>
          <div class="user__sale">{{user.discountLevel.name}} {{user.discountLevel.discount}}%</div>
        </div>
        <a href="#" @click="logout" class="logout">Выйти из профиля</a>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "VUser",
  data() {
    return {
      show: false,
    }
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions(['loginUser']),
    logout(){

      this.loginUser({token: ''});
      this.$router.push({name: 'main'})
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";

.user {
  position: relative;
  &__button {
    cursor: pointer;
    img{
      width: 100%;
      height: 100%;
    }
  }

  &__body {
    position: absolute;
    right: 0;
    top: 110%;
    z-index: 2;
    width: 430px;
    background: $white;
    padding: 24px;
    box-shadow: 0 4px 50px rgba(0, 0, 0, 0.15);
    border-radius: 2px;
  }

  &__row {
    display: flex;
    gap: 10px;

    & + & {
      margin-top: 14px;
    }
  }

  &__title {
    line-height: 120%;
    width: 100px;
    flex: 0 0 100px;
    color: $muted;
  }

  &__content {
    font-size: 14px;
    line-height: 130%;
  }

  &__sale {
    font-size: 20px;
    font-weight: 700;
    color: $black;
  }

  .logout {
    display: inline-block;
    margin-top: 32px;
    font-size: 16px;
    color: $black;
    padding: 10px 10px 10px 32px;
    background: url('../assets/img/logout.svg') left center / auto no-repeat;
    transition: color 0.3s;

    &:hover {
      color: $muted;
    }
  }
}
@media (max-width: 540px) {
  .user {
    &__button {
      width: 32px;
      height: 32px;
    }
    &__body {
      width: 320px;
    }
  }
}
</style>
