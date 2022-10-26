<template>
  <model-obj
    :src="url"
    :mtl="urlMtl"
    :scale="{x: 0.7, y: 0.7, z: 0.7}"
    :rotation="{ x: 0, y: Math.PI / 5, z: 0 }"
    :lights="lights"
    backgroundColor="#efeded"
  ></model-obj>
</template>

<script>
import {ModelObj} from 'vue-3d-model';

export default {
  name: "VObjectViews",
  components: {ModelObj},
  props: ['src', 'mtl'],
  methods: {},
  data() {
    return {
      url: 'https://dpn.bm-technology.ru/uploads/images/' + this.src,
      urlMtl: 'https://dpn.bm-technology.ru/uploads/images/' + this.mtl,
      lights: [
        {
          type: 'DirectionalLight',
          position: {x: 1, y: 1, z: 1},
          color: 0xffffff,
          intensity: 1,
        },
        {
          type: 'DirectionalLight',
          position: {x: -1, y: 1, z: 1},
          color: 0xffffff,
          intensity: 1,
        },
        {
          type: 'DirectionalLight',
          position: {x: 1, y: 1, z: -1},
          color: 0xffffff,
          intensity: 1,
        },
        {
          type: 'DirectionalLight',
          position: {x: -1, y: 1, z: -1},
          color: 0xffffff,
          intensity: 1.2,
        },
        {
          type: 'DirectionalLight',
          position: {x: 0, y: -1, z: 0},
          color: 0xffffff,
          intensity: 1.2,
        },
      ]
    }
  },
  mounted() {
    console.log(this.mtl)
  }
}
</script>

<style>
</style>
