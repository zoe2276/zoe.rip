<template>
  <div class="appRoot">
    <CRTContainer>
      <h1 @mousemove="e => updateShadowPos(e, true)" @mouseleave="resetElementShadow">{{ title }}</h1>
      <Counter />
    </CRTContainer>
  </div>
</template>

<script setup>
// deps
import { ref } from "vue"

// components
import Counter from './components/Counter.vue'
import CRTContainer from "./components/CRTContainer.vue"

//componsables
import { updateShadowPos, resetElementShadow } from './composables/glow'

const title = ref("zoe.rip")
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
