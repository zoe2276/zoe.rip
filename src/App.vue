<template>
  <div class="appRoot">
    <h1>{{ title }}</h1>
    <Counter />
  </div>
</template>

<script>
import Counter from './components/Counter.vue'

export default {
  name: "App",
  components: {
    Counter
  },
  data() {
    return {
      title: "a Vue app"
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
