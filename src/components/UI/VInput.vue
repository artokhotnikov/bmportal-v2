<template>
  <div class="form-control" ref="label" :class="{error: isError, active: isError}">
    <label
      :for="id"
    >
      {{ label }}
    </label>
    <input
      v-if="password"
      :value="value"
      @blur="blur"
      @focus="focus"
      @input.prevent="input"
      :id="id"
      :name="id"
      :type="type"
    >
    <input
      v-else
      @blur="blur"
      :value="value"
      @focus="focus"
      @input="input"
      :id="id"
      :name="id"
      type="text"
    >
    <div
      class="eye"
      :class="{'active': type=='text'}"
      @click="showPassword"
      v-if="password"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: "VInput",
  data() {
    return {
      type: 'password'
    }
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    isError: {
      type: Boolean,
      default: false,
    },
    password: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
    },
  },
  methods: {
    input({target}) {
      this.$emit("input", target.value);
    },
    focus() {
      this.$refs.label.classList.add('active')
    },
    blur() {
      if (this.value == '') {
        this.$refs.label.classList.remove('active')
      }
    },
    showPassword() {
      if (this.type != 'password') {
        this.type = 'password'
      } else {
        this.type = 'text'
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.form-control {
  position: relative;

  &.active {
    label {
      font-size: 10px;
      top: -5px;
      transform: translateY(0);
    }
  }

  &.error {
    input {
      border-color: red;
    }
  }

  label {
    font-size: 20px;
    color: $muted;
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.1s;
  }

  input {
    font-size: 16px;
    color: $primary;
    border-bottom: 1px solid #D6D8DF;
    width: 100%;
    height: 38px;
    padding-left: 5px;
    transition: border-color 0.3s;
  }
}

.eye {
  width: 24px;
  height: 24px;
  position: absolute;
  display: block;
  top: 50%;
  transform: translateY(-50%);
  right: 16px;
  background: url('../../assets/img/eye-open.svg') center / auto no-repeat;
  cursor: pointer;

  &.active {
    background-image: url('../../assets/img/eye-close.svg');
  }
}

.form-control {
  label {
    font-size: 16px;
  }
}
</style>
