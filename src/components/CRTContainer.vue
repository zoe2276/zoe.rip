<!-- provide a CRT display overlay as the root component -->
<template>
    <div class="crtContainer">
        <!-- <h1>hello i am a crt container</h1> -->
        <slot></slot>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue"

onMounted(() => document.querySelectorAll(".crtContainer").forEach(e => setInterval(() => e.classList.add("vignette"), 100)))
onUnmounted(() => {document.querySelectorAll(".crtContainer").forEach(e => e.classList.remove("vignette"))})
</script>

<style scoped>
.crtContainer {
    position: relative;
    width: 99vw;
    height: 99vh;

    will-change: border, border-radius, box-shadow, padding;
    transition: border 1s cubic-bezier(0.75, 1, 0.25, 1), border-radius  1s cubic-bezier(0.75, 1, 0.25, 1), box-shadow 1s cubic-bezier(0.75, 1, 0.25, 1), padding 1s cubic-bezier(0.75, 1, 0.25, 1);

    &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: calc(99vw - 10vmin);
        height: calc(99vh - 10vmin);

        background-color: none;
        border: 0 solid #000F;
        box-shadow: none;

        will-change: border, border-radius, box-shadow, padding;
        transition: border 1s cubic-bezier(0.75, 1, 0.25, 1), border-radius  1s cubic-bezier(0.75, 1, 0.25, 1);
    }

    &.vignette {
        background-color: #2F2F35;
        padding: 5vmin;

        &::after {
            border: 5vmin solid #2F2F35FF;
            border-radius: 12vmin;
            box-shadow: inset 0 0 20vmin 5vw #0007;
        }
    }
}
</style>