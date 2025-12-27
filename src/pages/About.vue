<template>
    <div id="page-about">
        <p>
            hello. my name is zoe. this is my website. make yourself at home.
<br />
<br />
            i am a hobbyist programmer. i started very young, playing with HTML and CSS before moving on to learn JavaScript and React.js, where most of my experience lies.
<br />
<br />
            now, i have bigger ideas and i hope to get them implemented here as soon as possible!
        </p>
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