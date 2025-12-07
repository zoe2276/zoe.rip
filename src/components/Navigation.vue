<template>
    <div class="navmenu">
        <div class="navtarget" v-if="currentPage === './home'">welcome. where would you like to go?</div>
        <div class="navtarget active" @click="updatePage" v-if="currentPage !== './home'">./home</div>
        <div class="navtarget" v-else>./home [*]</div> 
        <div class="navtarget active" @click="updatePage" v-if="currentPage !== './about'">./about</div>
        <div class="navtarget" v-else>./about [*]</div>
        <div class="navtarget active" @click="updatePage" v-if="currentPage !== './projects'">./projects</div>
        <div class="navtarget" v-else>./projects [*]</div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
const currentPage = defineModel()

const updatePage = e => currentPage.value = e.target.innerHTML


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
onMounted(() => {
    typeNavTarget(currentPage.value === "./home" ? 6 : 1)
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