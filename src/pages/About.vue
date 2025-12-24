<template>
    <div id="page-about">
        <pre>hello. my name is zoe. this is my website. make yourself at home.</pre>
        <Console delay="3"/>
    </div>
</template>

<script setup>
import Console from '../components/Console.vue';
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