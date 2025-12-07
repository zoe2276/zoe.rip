<!-- provide a CRT display overlay as the root component -->
<template>
    <div class="crtHousing">
        <div class="crtContainer" @mousemove="updateShadowPos" @mouseleave="resetElementShadow">
            <CursorGlow />
            <component :is="pageToRender" />
        </div>
    </div>
</template>

<script setup>
import { shallowRef } from "vue"
import { resetElementShadow, updateShadowPos } from "../composables/glow"
import Home from "../pages/Home.vue"
import CursorGlow from "./CursorGlow.vue"

import page from "./Navigation.vue"

const pageToRender = shallowRef(page === "./about" ? About : page === "./projects" ? Projects : Home ?? Home)
</script>

<style scoped>
.crtHousing {
    /* background-color: #2F2F35; */
    border-radius: 8px;
    height: 100vh;
    max-height: 720px;
    width: 100vw;
    max-width: 1280px;
    z-index: -2;
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
        height: 94%;
        padding: 6vh 6vw;
        width: 94%;

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

@keyframes slideUp {
    from { max-height: 100vh }
    to { max-height: 0 }
}

@keyframes slideDown {
  from { max-height: 0 }
  to { max-height: 100vh }
}
</style>