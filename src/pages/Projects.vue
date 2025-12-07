<template>
    <div id="page-about">
        <pre>these are my projects</pre>

        <Navigation v-model="currentPage"/>
    </div>
</template>

<script setup>
import Navigation from '../components/Navigation.vue';
const currentPage = defineModel()
</script>

<style>
@keyframes slideUp {
    from { max-height: 100vh }
    to { max-height: 0 }
}

@keyframes slideDown {
  from { max-height: 0 }
  to { max-height: 100vh }
}
</style>

<style scoped>
#page-about {
    animation: slideDown 1s steps(17, end) forwards;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
}
</style>