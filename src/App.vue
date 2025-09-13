<template>
  <div class="appRoot">
    <h1 @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">{{ title }}</h1>
    <Counter />
  </div>
</template>

<script>
// components
import Counter from './components/Counter.vue'

//componsables
import { updateShadowPos, resetElementShadow } from './composables/glow'

export default {
  name: "App",
  components: {
    Counter
  },
  data() {
    return {
      title: "a Vue app"
    }
  }, methods: {
      handleMouseMove(event) {
          updateShadowPos(event)
      },
      handleMouseLeave(event) {
          resetElementShadow(event)
      }
  }
}
</script>

<style scoped>
.app {
  font-family: "Arial sans-serif";
  padding: 20px;
}

h1 {
  color: #42b983;
}
</style>
