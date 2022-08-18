<template>
  <model-obj
    :src="url"
    :scale="{x: 0.7, y: 0.7, z: 0.7}"
    :rotation="{ x: 0, y: Math.PI / 5, z: 0 }"
    :lights="lights"
  ></model-obj>
</template>

<script>
import {ModelObj} from 'vue-3d-model';

export default {
  name: "VObjectViews",
  components: {ModelObj},
  props: ['src'],
  methods: {
  },
  data() {
    return {
      url: 'https://data.dealer.useful.su/uploads/images/' + this.src,
      lights: [
        {
          type: 'DirectionalLight',
          position: { x: 1, y: 1, z: 1 },
          color: 0xffffff,
          intensity: 0.5,
        },
        {
          type: 'DirectionalLight',
          position: { x: -1, y: 1, z: 1 },
          color: 0xffffff,
          intensity: 0.5,
        },
        {
          type: 'DirectionalLight',
          position: { x: 1, y: 1, z: -1 },
          color: 0xffffff,
          intensity: 0.5,
        },
        {
          type: 'DirectionalLight',
          position: { x: -1, y: 1, z: -1 },
          color: 0xffffff,
          intensity: 0.5,
        },
        {
          type: 'DirectionalLight',
          position: { x: 0, y: -1, z: 0 },
          color: 0xffffff,
          intensity: 0.5,
        },
      ]
    }
  },

}
</script>

<style >
canvas {
}
</style>
