<template>
    <div class="cursorGlow" id="cursorGlow">
    </div>
</template>

<script setup>

</script>

<style scoped>
.cursorGlow {
    position: absolute;
    width: 3rem;
    aspect-ratio: 1 / 1;
    border-radius: 100%;
    pointer-events: none;
    background: #42b983;
    filter:blur(24px)
    /* box-shadow: 0px 0px 10vmin #42b983; */

}
</style>