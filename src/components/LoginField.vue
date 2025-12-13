<template>
    <div class="loginField-container" v-if="props.type === 'username'">
        <!-- <div> -->
            <span class="label-username" :id="`label-${type}`">username:</span>
        <!-- </div> -->
        <input id="loginForm-username" v-model="username" type="text"
            @input="scheduleUpdate"
            @keydown="scheduleUpdate"
            @click="scheduleUpdate"
            @blur="checkForValue"
            ref="inputEl"
        />
        <div id="caret" ref="caretEl" class="caret" :style="caretStyle" />
    </div>
    <div class="loginField-container" v-else-if="props.type === 'password'">
        <!-- <div> -->
            <label class="label-password" for="loginForm-password" :id="`label-${type}`">password:</label>
        <!-- </div> -->
        <input id="loginForm-password" v-model="password" type="password" @blur="checkForValue" @keyup.enter="submit" ref="inputEl" />
        <div id="caret" ref="caretEl" class="caret" :style="caretStyle" />
    </div>
    <div v-else-if="props.type === 'submit'">
        <button @click="submit">submit</button>
    </div>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { backspaceEffect, typeEffect } from '../composables/typewriter';
import { useCaret } from "../composables/caret"

// caret stuff
const inputEl = ref(null)
const caretEl = ref(null)
const text = ref(null)
const {caretStyle, scheduleUpdate} = useCaret({
    target: inputEl,
    caret: caretEl
})


const props = defineProps(['type'])
const emit = defineEmits(['checkForValue', 'submit'])
const username = defineModel('username')
const password = defineModel('password')

const checkForValue = e => emit('checkForValue', e)
const submit = e => {
    emit('submit', { username: username.value, password: password.value })
}

onMounted(() => {
    typeEffect(`.label-${props.type}`, 15, props.type === "username" ? 3 : 0.5)
})

// cleanup
onUnmounted(() => {
    backspaceEffect(`.label-${props.type}`, 20, 0)
})
</script>

<style scoped>
.loginField-container {
    position: relative;
    display: flex;
}
input {
    color:#42b983ee;
    caret-color: transparent;
    background: transparent;
    border: none;
    outline: none;
    border-bottom: 1px solid #42b983ee !important;
    border-bottom-style: dashed !important;
    margin-left: 0.5rem;
    width: clamp(32px, 50%, 400px);
    line-height: 1.25rem;
    font-family:'Courier New', Courier, monospace;
    text-shadow: 0 0 1rem #42b983aa;
    
    align-self: flex-start;

    &:focus {
        border: none;
    }
}
span[class^=label-] {
    overflow: hidden;
    white-space: nowrap;
    max-width: fit-content;
    width: 0;
    height: 0;

    &.shown {
        width: 100%;
        height: auto;
    }
}
</style>