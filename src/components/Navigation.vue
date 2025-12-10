<template>
    <div id= "navmenu">
        <div class="navtarget" v-if="$route.path === '/'">welcome. where would you like to go?</div>
        <RouterLink class="navtarget active" v-if="$route.path !== '/'" to="/">./home</RouterLink>
        <div class="navtarget" v-else>./home [*]</div> 
        <RouterLink class="navtarget active" v-if="$route.path !== '/about'" to="/about">./about</RouterLink>
        <div class="navtarget" v-else>./about [*]</div>
        <RouterLink class="navtarget active" v-if="$route.path !== '/projects'" to="/projects">./projects</RouterLink>
        <div class="navtarget" v-else>./projects [*]</div>
        <RouterLink class="navtarget active" v-if="$route.path !== '/login' && !isLoggedIn" to="/login">./login</RouterLink>
        <div class="navtarget" v-else-if="$route.path === '/login'">./login [*]</div>
        <div class="navtarget strikethru" v-else>./login</div>
        <!-- protected endpoints -->
        <RouterLink class="navtarget active" v-if="isLoggedIn && $route.path !== '/protected'" to="/protected">./projects</RouterLink>
        <div class="navtarget" v-else-if="isLoggedIn">./protected [*]</div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { typeEffect } from '../composables/typewriter'

const props = defineProps(["position"])
const isLoggedIn = window.localStorage.getItem("jwtAuth")

const setToTop = (positionProp) => {
    if (positionProp === "top") { document.querySelector("#navmenu")?.classList.add("top") }
}

// set up "initializing..." effect
const route = useRoute()
onMounted(() => {
    typeEffect(".navtarget", 20, route.path === "/" ? 6 : 1)
    setToTop(props.position)
})
</script>

<style scoped>
#navmenu {
    /* align-self:flex-end; */
    justify-self:flex-start;
    text-align: start;

    display:flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content:flex-end;

    &.top {
        order: -1;
    }
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

    &.strikethru {
        text-decoration-line: line-through;
        text-decoration-color: #42b983ee
    }
    /* animation: typing 1.3s steps(10, end) 6s; */
}
</style>