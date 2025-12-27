<template>
  <div class="appRoot">
    <CRTContainer />
  </div>
</template>

<script setup>
import CRTContainer from "./components/CRTContainer.vue"
</script>

<style>
@media only screen and (max-width: 1200px) {
  :root {
    font-size: clamp(4px, 3.25vw, 14px);
  }
  
  .asciiTitle {
    font-size: clamp(4px, 2vw, 14px);
  }
}
@media only screen and (min-width: 1200px) {

}



</style>

<style scoped>
.appRoot {
  font-family:'Courier New', Courier, monospace;
  text-shadow: 0 0 1rem #42b983aa;
}
</style>
