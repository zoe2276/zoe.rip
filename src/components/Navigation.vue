<template>
    <div class="navmenu">
        <div class="navtarget">welcome. where would you like to go?</div>
        <div class="navtarget" @click="updatePage">./about</div>
        <div class="navtarget" @click="updatePage">./projects</div>
    </div>
</template>

<script setup>
import { ref } from "vue"
const updatePage = (e) => {
    console.log(e.target.innerHTML)
    page = e
}

const page = ref("")
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
    /* animation: typing 1.3s steps(10, end) 6s; */
}
</style>