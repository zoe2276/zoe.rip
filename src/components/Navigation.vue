<template>
    <div class="navmenu">
        <div class="navtarget">welcome. where would you like to go?</div>
        <div class="navtarget">./about</div>
        <div class="navtarget">./projects</div>
    </div>
</template>

<script setup>
const toNewPage = () => {

}
</script>

<style scoped>
.navmenu {
    align-self:flex-end;
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

    /* animation: typing 1.3s steps(10, end) 6s; */

    &.shown {
        width: 100%;
    }
    /* &[style^="animation"] {
        width: 100%;
    } */
}

.typing {
    animation: typing 1.3s steps(10, end);
}

@keyframes typing {
    from { width: 0 }
    to { width: 100% }
}
</style>