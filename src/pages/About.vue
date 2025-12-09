<template>
    <div id="page-about">
        <pre>hello. my name is zoe. this is my website. make yourself at home.</pre>
        <Navigation />
    </div>
</template>

<script setup>
import Navigation from '../components/Navigation.vue';
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