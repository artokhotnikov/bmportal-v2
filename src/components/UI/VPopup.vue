<template>
  <div class="popup">
    <div class="popup__bg" @click.self="close"></div>
    <div class="popup__body">
      <div class="popup__close" @click="close"></div>
      <div class="popup__title">{{ item.name }}</div>
      <div v-if="width > 1200" class="popup__content">
        <div class="popup__left">
          <div class="tabs">
            <div @click="activeLeftTab = 1" class="tab" :class="{active: activeLeftTab == 1}">Фото</div>
            <div v-if="item.video" @click="activeLeftTab = 2" class="tab" :class="{active: activeLeftTab == 2}">Видео
            </div>
            <div v-if="item.obj3d != null &&  item.obj3d.length" @click="activeLeftTab = 3" :class="{active: activeLeftTab == 3}" class="tab">
              3D-модель
            </div>
          </div>
          <div class="tabs-content">
            <transition mode="out-in" name="fade">
              <div class="slider" key="1" v-if="activeLeftTab == 1">
                <v-swiper :list="item.images"></v-swiper>
              </div>
              <div class="video" key="2" v-else-if="activeLeftTab == 2">
                <video
                  src="https://ia600907.us.archive.org/2/items/bliptv-20131013-191530-AshleysHugtime-AshleyIsASexMachine343./bliptv-20131013-191530-AshleysHugtime-AshleyIsASexMachine343.mp4"
                  controls></video>
              </div>
              <div class="obj3d" key="3" v-else-if="activeLeftTab == 3">
                <v-object-views :src="item.obj3d[0]"></v-object-views>
              </div>
            </transition>
          </div>
        </div>
        <div class="popup__right">
          <div class="tabs">
            <div v-if="description" @click="activeRightTab = 1" class="tab" :class="{active: activeRightTab == 1}">
              Описание
            </div>
            <div v-if="item.specification" @click="activeRightTab = 2" class="tab"
                 :class="{active: activeRightTab == 2}">Оборудование
            </div>
          </div>
          <transition mode="out-in" name="fade">
            <div v-if="activeRightTab == 1" v-html="description" class="popup__description">
            </div>
            <div v-else-if="activeRightTab == 2" class="popup__device" v-html="createDiv(item.specification)"></div>
          </transition>
        </div>
      </div>
      <div v-else class="popup__content">
        <div class="tabs">
          <div @click="mobileTab = 1" class="tab" :class="{active: mobileTab == 1}">Фото</div>
          <div v-if="item.obj3d != null && item.obj3d.length" @click="mobileTab = 5" class="tab" :class="{active: mobileTab == 5}">
            3D-модель
          </div>
          <div v-if="item.video" @click="mobileTab = 2" class="tab" :class="{active: mobileTab == 2}">Видео
          </div>
          <div v-if="description" @click="mobileTab = 3" class="tab" :class="{active: mobileTab == 3}">Описание</div>
          <div v-if="item.specification" @click="mobileTab = 4" class="tab" :class="{active: mobileTab == 4}">
            Оборудование
          </div>
        </div>
        <div class="tabs-content">
          <transition mode="out-in" name="fade">
            <div class="slider" key="1" v-if="mobileTab == 1">
              <v-swiper :list="item.images"></v-swiper>
            </div>
            <div class="video" key="2" v-else-if="mobileTab == 2">
              <video
                src="https://ia600907.us.archive.org/2/items/bliptv-20131013-191530-AshleysHugtime-AshleyIsASexMachine343./bliptv-20131013-191530-AshleysHugtime-AshleyIsASexMachine343.mp4"
                controls></video>
            </div>
            <div v-else-if="mobileTab == 3" key="3" v-html="description" class="popup__description">
            </div>
            <div v-else-if="mobileTab == 4" key="4" class="popup__device" v-html="createDiv(item.specification)"></div>
            <div v-else-if="mobileTab == 5" key="4" class="obj3d" >
              <v-object-views :src="item.obj3d[0]"></v-object-views>
            </div>
          </transition>
        </div>
      </div>
      <a href="#" download="" class="download">Скачать</a>
    </div>
  </div>
</template>

<script>
import VSwiper from "@/components/UI/VSwiper";
import VObjectViews from "@/components/UI/VObjectViews";

export default {
  name: "VPopup",
  components: {VObjectViews, VSwiper},
  props: {
    item: {
      type: Object,
      required: true
    },
    description: {
      type: String,
    }
  },
  data() {
    return {
      activeLeftTab: 1,
      activeRightTab: 1,
      width: 0,
      mobileTab: 1,
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    createDiv(item) {
      return item.join('<br>')
    },
    isDescription() {
      if (this.description) {
        this.activeRightTab = 1
      } else {
        this.activeRightTab = 2
      }
    }
  },
  computed: {},
  beforeMount() {
    this.isDescription()
    this.width = window.innerWidth;
  },
  mounted() {
    console.log(this.item)
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;

  &__bg {
    background: rgba(245, 217, 128, 0.4);
    backdrop-filter: blur(5px);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  &__close {
    position: absolute;
    top: 24px;
    right: 24px;
    width: 40px;
    height: 40px;
    display: block;
    background: url('../../assets/img/close.svg') no-repeat;
    cursor: pointer;
  }

  &__body {
    background: $white;
    box-shadow: 0 4px 50px rgba(0, 0, 0, 0.15);
    border-radius: 62px;
    position: relative;
    z-index: 5;
    width: 100%;
    max-width: 1500px;
    padding: 55px 110px 90px 130px;
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-weight: 700;
    font-size: 40px;
    color: $black;
    text-align: center;
    margin-bottom: 65px;
  }

  &__content {
    display: flex;
    gap: 50px;
    flex: 1 1 auto;
  }

  &__left {
    flex: 0 1 38%;
    padding-right: 30px;
    border-right: 1px solid #D6D8DF;
    display: flex;
    flex-direction: column;
  }

  &__right {
    flex: 0 1 58%;
  }

  &__description {
    line-height: 120%;
    padding-right: 20px;
    height: 490px;
    overflow: auto;
  }

  &__device {
    padding-right: 20px;
    height: 488px;
    overflow: auto;
  }
}

.download {
  position: absolute;
  bottom: 50px;
  right: 50px;
  height: 40px;
  color: #F0887C;
  text-decoration: underline;
  padding-left: 60px;
  display: inline-flex;
  align-items: center;
  background: url('../../assets/img/download.svg') center left / 40px no-repeat;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.1);
  }
}

.tabs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 24px;

  &-content {
    flex: 1 1 auto;
  }
}

.tab {
  padding: 6px 8px;
  transition: all 0.3s;
  border-bottom: 1px solid transparent;
  cursor: pointer;

  &:hover {
    color: #F0887C;
  }

  &.active {
    color: #F0887C;
    border-color: #D6D8DF;
  }
}

.video {
  position: relative;
  padding-bottom: 100%;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.obj3d {
  height: 100%;
}

@media (max-width: 1560px) {
  .popup {
    padding: 0 40px;

    &__title {
      font-size: 32px;
      margin-bottom: 36px;
    }

    &__body {
      max-width: 1160px;
      padding: 30px 20px 70px 40px;
    }

    &__left {
      flex: 0 1 34%;
    }

    &__description {
      height: 320px;
    }

    &__device {
      height: 320px;
    }
  }
  .download {
    bottom: 20px;
  }
}

@media (max-width: 1200px) {
  .popup {
    &__content {
      flex-direction: column;
      gap: 20px;
    }

    &__title {
      font-size: 28px;
    }

    &__body {
      padding: 56px 32px 70px;
    }

    &__description,
    &__device {
      height: 390px;
    }
  }
  .tabs {
    margin-bottom: 0;
    flex-wrap: wrap;
  }
  .download {
    right: auto;
    left: 50px;
  }
}

@media (max-width: 767px) {
  .popup {
    &__title {
      font-size: 24px;
      margin-bottom: 24px;
    }
    &__body {
      max-height: 600px;
      overflow: auto;
      height: 600px;
    }
  }
}

@media (max-width: 540px) {
  .popup {
    padding: 0 8px;

    &__body {
      border-radius: 20px;
      padding: 52px 20px 30px;
    }

    &__close {
      top: 12px;
      right: 12px;
    }

    &__content {
      width: 100%;
    }

    &__description,
    &__device {
      height: auto;
      overflow: hidden;
    }
  }
  .download {
    position: static;
    margin-top: 10px;
    padding: 8px 40px;
    background-size: 32px;
    height: 32px;
  }
}
</style>
