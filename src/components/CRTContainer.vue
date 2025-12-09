<!-- provide a CRT display overlay as the root component -->
<template>
    <div class="crtHousing">
        <div class="crtContainer" @mousemove="updateShadowPos" @mouseleave="resetElementShadow">
            <CursorGlow />
            <RouterView />
        </div>
    </div>
</template>

<script setup>
import { onUnmounted } from "vue"
import { RouterView } from "vue-router"
import { resetElementShadow, updateShadowPos } from "../composables/glow"

import Navigation from "./Navigation.vue"
import CursorGlow from "./CursorGlow.vue"

const removeClass = (selector, className) => {
    document.querySelectorAll(selector).forEach(e => e.classList.remove(className))
}

// cleanup
onUnmounted(() => {
    removeClass(".crtContainer", "vignette")
})

</script>

<style scoped>
* {
    color: #42b983;
}
.crtHousing {
    /* background-color: #2F2F35; */
    border-radius: 8px;
    height: 100vh;
    max-height: 720px;
    width: 100vw;
    max-width: 1280px;
    margin-left: clamp(0px, calc(50vw - (0.5 * 1280px)), 100vw);
}
.crtContainer {
    /* background-color: #2F2F35; */
    position: relative;
    width: 100vw;
    height: 100vh;

    will-change: border, border-radius, box-shadow, padding;
    transition: border 2s cubic-bezier(0.75, 1, 0.25, 1), border-radius  2s cubic-bezier(0.75, 1, 0.25, 1), box-shadow 2s cubic-bezier(0.75, 1, 0.25, 1), padding 2s cubic-bezier(0.75, 1, 0.25, 1);

    &::after {
        background-color: #2F2F35;
        color: #2F2F35;
        z-index: -1;
        
        box-sizing:border-box;
        pointer-events: none;
        content: "";
        position: absolute;
        left: 0;
        top: 0;

        height: 100vh;
        max-height: 720px;
        width: 100vw;
        max-width: 1280px;
        /* height: 100%;
        width: 100%; */

        box-shadow: none;

        will-change: border, border-radius, box-shadow, padding;
        /* transition: border 2s cubic-bezier(0.75, 1, 0.25, 1), border-radius  2s cubic-bezier(0.75, 1, 0.25, 1); */
        transition: all 2s ease-in;
    }

    &.vignette {
        height: 100%;
        padding: 4rem 5rem;
        width: 100%;

        &::after {
            border-top: 32px solid #2F2F35;
            border-bottom: 32px solid #2F2F35;
            border-left: 40px solid #2F2F35;
            border-right: 40px solid #2F2F35;
            border-radius: 60px;
            box-shadow: inset 0 0 200px 80px #0007;
        }
    }
}
</style>