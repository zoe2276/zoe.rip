<!-- provide a CRT display overlay as the root component -->
<template>
    <div class="crtHousing" id="crtHousing">
        <div class="crtContainer" @mousemove="e => updateShadowPos(e, 'crtHousing')" @mouseleave="resetElementShadow">
            <CursorGlow />
            <RouterView />
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue"
import { RouterView } from "vue-router"
import { resetElementShadow, updateShadowPos } from "../composables/glow"

import Navigation from "./Navigation.vue"
import CursorGlow from "./CursorGlow.vue"

const appendClass = (selector, className, delay = 0, first) => {
    (first ? [document.querySelector(`${selector}:not(.${className})`)].filter(Boolean) : document.querySelectorAll(selector)).forEach(e => setTimeout(() => e.classList.add(className), delay))
}
const removeClass = (selector, className) => {
    document.querySelectorAll(selector).forEach(e => e.classList.remove(className))
}

onMounted(() => {
    appendClass(".crtContainer", "vignette")
})

// cleanup
onUnmounted(() => {
    removeClass(".crtContainer", "vignette")
})

</script>

<style>
@keyframes type {
    from { width: 0; }
    to { width: 100% }
}

@keyframes backspace {
    from { width: 100% }
    to { width: 0; }
}

@keyframes grow {
    from { height: 0 }
    to { height: auto }
}

@keyframes grow {
    from { height: auto }
    to { height: 0 }
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
        pointer-events: none;
    }

    &.vignette {
        height: 100%;
        width: 100%;

        &::after {
            border-radius: 60px;
            box-shadow: inset 0 0 200px 80px #0007;
        }
    }
}

@media only screen and (max-width: 1200px) {

    .crtContainer.vignette {
        padding: 4vh calc(2rem + 5vw) !important;
    
        &::after {
            border-top: 3vh solid #2F2F35 !important;
            border-bottom: 3vh solid #2F2F35 !important;
            border-left: 4vw solid #2F2F35 !important;
            border-right: 4vw solid #2F2F35 !important;
        }
    }
}

@media only screen and (min-width: 1200px) {
    .crtContainer.vignette {
        padding: 4rem 5rem;
        
        &::after {
            border-top: 32px solid #2F2F35;
            border-bottom: 32px solid #2F2F35;
            border-left: 40px solid #2F2F35;
            border-right: 40px solid #2F2F35;
        }
    }
}

</style>