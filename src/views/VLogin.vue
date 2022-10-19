<template>
  <div class="container">
    <div class="logo">
      <img src="../assets/img/logo.png" alt="">
    </div>
    <h1 class="title">Добро пожаловать на портал дилера BM GROUP</h1>
    <form class="form" @submit.prevent="login">
      <transition name="fade">
        <div v-if="loginError" class="alert">Неверные логин/пароль</div>
      </transition>
      <transition name="fade">
        <div v-if="serverError" class="alert">Ошибка ответа сервера, попробуйте позже. <br> Или обратитесь к системному
          администратору
        </div>
      </transition>
      <v-input
        :is-error="loginError"
        ref="email"
        v-model="user.email"
        label="Ваш логин"
        id="name"
      />
      <v-input
        :is-error="loginError"
        ref="password"
        v-model="user.password"
        :password="true"
        label="Ваш пароль"
        id="password"
      />
      <div class="policy">
        <input v-model="user.policy" type="checkbox" name="policy" id="policy">
        <label for="policy">Нажимая на кнопку, вы даете согласие на обработку
          <a href="#">персональных данных</a>
          и соглашаетесь с 
          <a href="#">политикой конфиденциальности</a>.</label>
      </div>
      <v-button :disabled="isEmpty" classes="secondary">Войти в профиль</v-button>
    </form>
    <v-loader v-if="isLoading"></v-loader>
  </div>
</template>

<script>
import VInput from "@/components/UI/VInput";
import VButton from "@/components/UI/VButton";
import axios from "axios";
import VLoader from "@/components/UI/VLoader";
import {mapActions} from "vuex";

export default {
  name: "VLogin",
  components: {VLoader, VButton, VInput},
  data() {
    return {
      AUTH_URL: 'https://data.dealer.useful.su/api/authentication_token',
      token: '',
      user: {
        email: '',
        password: '',
        policy: true,
      },
      loginError: false,
      serverError: false,
      isLoading: false,
    }
  },
  methods: {
    ...mapActions(['loginUser']),
    async login() {
      this.isLoading = true;
      try {
        const response = await axios({
          method: 'post',
          baseURL: this.AUTH_URL,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            'email': this.user.email,
            'password': this.user.password
          })
        });
        this.token = response.data.token;
        this.loginUser({token: response.data.token})
        this.$router.push('/store');
      } catch (e) {
        if (e.response.status === 401) {
          this.loginError = true;
        } else {
          this.serverError = true;
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {
    isEmpty() {
      return !(this.user.password && this.user.email && this.user.policy)
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";

.container {
  padding-top: 60px;
}

.logo {
  width: 532px;
  margin: 0 auto 80px;

  img {
    width: 100%;
    height: 100%;
  }
}

.title {
  font-weight: 700;
  font-size: 40px;
  line-height: 145%;
  text-align: center;
  color: $primary;
  width: 500px;
  margin: 0 auto;
}

.form {
  width: 600px;
  margin: 90px auto 0;
  position: relative;

  .form-control + .form-control {
    margin-top: 32px;
  }
}

.policy {
  margin: 45px 0 0 4px;
  display: flex;
  gap: 2px;
  font-size: 14px;
  color: $muted;
  align-items: flex-start;

  input {
    flex: 0 0 24px;
    cursor: pointer;
  }

  label {
    cursor: pointer;
    line-height: 150%;
    position: relative;
    top: -2px;
  }

  a {
    color: $secondary;
    text-decoration: underline;
    transition: color 0.2s;

    &:hover {
      color: $info;
    }
  }
}

.btn {
  margin-top: 35px;
}

.forget {
  display: table;
  margin: 35px auto 0;
  font-size: 20px;
  text-decoration: underline;
  color: $muted;
  transition: color 0.2s;

  &:hover {
    color: $black;
  }
}

.alert {
  font-size: 18px;
  text-align: center;
  color: red;
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}

@media (max-width: 1560px) {
  .container {
    padding-top: 40px;
  }
  .logo {
    width: 420px;
    margin: 0 auto 36px;
  }
  .title {
    font-size: 36px;
    line-height: 120%;
  }
  .form {
    padding-bottom: 40px;
  }
}

@media (max-width: 768px) {
  .logo {
    width: 320px;
  }
  .title {
    font-size: 28px;
  }
  .form {
    margin: 60px 0 0;
    width: 100%;
    padding: 0 20px;
  }
  .alert {
    top: -50px;
    font-size: 14px;
  }
  .policy {
    font-size: 12px;
  }
}

@media (max-width: 540px) {
  .logo {
    width: 280px;
  }
  .title {
    padding: 0 20px;
    width: 100%;
    font-size: 24px;
  }

}
</style>
