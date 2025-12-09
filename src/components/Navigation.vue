<template>
    <div class="navmenu">
        <div class="navtarget" v-if="$route.path === '/'">welcome. where would you like to go?</div>
        <RouterLink class="navtarget active" v-if="$route.path !== '/'" to="/">./home</RouterLink>
        <div class="navtarget" v-else>./home [*]</div> 
        <RouterLink class="navtarget active" v-if="$route.path !== '/about'" to="/about">./about</RouterLink>
        <div class="navtarget" v-else>./about [*]</div>
        <RouterLink class="navtarget active" v-if="$route.path !== '/projects'" to="/projects">./projects</RouterLink>
        <div class="navtarget" v-else>./projects [*]</div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const typeNavTarget = (delay = 6) => {
    const navTargets = document.querySelectorAll(".navtarget:not(.shown)")
    for (let i = 0; i < navTargets.length; i++) {
        const el = navTargets[i]
        const charCount = el.innerHTML.length
        const typeDuration = charCount / (i === 0 ? 15 : 7)
        const styleString = `animation: type ${typeDuration}s steps(${charCount}, end) ${delay}s, grow 1ms steps(1, end) ${delay}s;`
        el.setAttribute("style", styleString)
        setTimeout(() => el.classList.add("shown"), delay * 1001)
        delay += typeDuration
    }
}


// set up "initializing..." effect
const route = useRoute()
onMounted(() => {
    typeNavTarget(route.path === "/" ? 6 : 1)
})
</script>

<style scoped>
.navmenu {
    /* align-self:flex-end; */
    justify-self:flex-start;
    text-align: start;

    display:flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content:flex-end;
}

.navtarget {
    background-image: linear-gradient(to right, #42b983ee, #42b983);
    background-clip: text;
    color: #0000;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    /* margin: 0 auto; */
    width: 0;
    height: 0;

    &.shown {
        width: 100%;
        height: auto;
    }

    &.active {
        cursor: pointer;
        text-decoration: underline #42b983ee;

        &:hover {
            text-decoration: none;
        }
    }
    /* animation: typing 1.3s steps(10, end) 6s; */
}
</style>