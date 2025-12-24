<template>
    <div class="loginField-container" v-if="['username', 'email', 'password', 'validatePassword'].includes(props.type)">
        <span :class="`label-${type}`" :id="`label-loginForm-${type}`">{{ type === 'validatePassword' ? 'verify password' : type }}:</span>
        <input :id="`loginForm-${type}`" :v-model="type" :type="['password', 'validatePassword'].includes(props.type) ? 'password' : props.type === 'email' ? 'text' : 'text'" 
            @input="scheduleUpdate"
            @keydown="scheduleUpdate"
            @click="scheduleUpdate"
            @blur="checkForValue"
            @keyup.enter="checkForValue"
            ref="inputEl"
        /> <!-- for some reason the email type isn't tracked by the caret-->
        <div id="caret" ref="caretEl" class="caret" :style="caretStyle" />
    </div>
    <div class="loginField-container loginType" v-else-if="props.type === 'loginType'">
        <span id="label-loginForm-loginType-login" class="label-loginType" @click="checkForValue">login</span>
        <input type="radio" id="loginType-login" value="login" v-model="modelValue">
        <span class="label-loginType-spacer">/</span>
        <span id="label-loginForm-loginType-register" class="label-loginType" @click="checkForValue">register</span>
        <input type="radio" id="loginType-register" value="register" v-model="modelValue">
    </div>
    <div v-else-if="props.type === 'submit'">
        <button id="loginForm-submit" @click="submit">submit</button>
    </div>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { backspaceEffect, typeEffect } from '../composables/typewriter';
import { useCaret } from "../composables/caret"

const props = defineProps(['type'])
const emit = defineEmits(['checkForValue', 'submit'])

const modelValue = defineModel()
// const loginType = defineModel('loginType')
// const username = defineModel('username')
// const email = defineModel('email')
// const password = defineModel('password')
// const validatePassword = defineModel('validatePassword')

// caret stuff
const inputEl = ref(null)
const caretEl = ref(null)
const text = ref(null)
const {caretStyle, scheduleUpdate} = useCaret({
    target: inputEl,
    caret: caretEl,
    labelId: `label-loginForm-${props.type}`
})


const checkForValue = e => {
    modelValue.value = props.type === "loginType" ? e.target.textContent : e.target.value
    if (props.type === "loginType") {
        const targetId = e.target.id
        const qs = document.querySelector(".selectedLoginType")
        if (targetId !== qs?.id) {
            Array.from(document.querySelectorAll(".selectedLoginType")).forEach(e => e.classList.remove("selectedLoginType"))
            e.target.classList.add("selectedLoginType")
        }
    }
    emit('checkForValue', props.type, props.type === "loginType" ? e.target.textContent : e.target.value)
}
const submit = e => emit('submit')

onMounted(() => {
    typeEffect(`.label-${props.type}`, 15, ['username', 'password', 'loginType'].includes(props.type) ? 3 : 0)
    typeEffect(`#loginForm-${props.type}`, props.type === "submit" ? 1000 : 15, ['username', 'password', 'submit'].includes(props.type) ? 4 : 1)
    if (props.type === "loginType") {
        document.querySelector("#label-loginForm-loginType-login").classList.add("selectedLoginType")
        typeEffect(".label-loginType-spacer", 15, 3)
    }

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
    justify-content: end;

    &.loginType {
        justify-content: center !important;
        & input {
            margin: -1px;
        }
        & span {
            margin: 1px;
        }
    }

    &:not(.loginType) > span {
        flex-basis: 33%;
    }
    &:not(.loginType) > input {
        flex-basis: 66%;
    }
}
input {
    color:#42b983ee;
    caret-color: transparent;
    background: transparent;
    border: none;
    outline: none;
    border-bottom: 1px solid #42b983ee !important;
    border-bottom-style: dashed !important;
    margin-left: 8px;
    /* margin-left: 0.5rem; */
    /* width: clamp(32px, 50%, 400px); */
    width: 0;
    height: 0;
    visibility: hidden;

    &.shown {
        width: 100%;
        height: auto;
        visibility: visible;
    }
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
    visibility: hidden;

    &.shown {
        width: 100%;
        height: auto;
        visibility: visible;
    }
}


span[id^=label-loginForm-loginType-] {
    text-decoration: underline;
    font-weight: 500;
    cursor: pointer;
    
    &.selectedLoginType {
        text-decoration: none;
        font-weight: 800;
        cursor: default;
    }
}

#loginForm-submit {
    visibility: hidden;
    &.shown {
        visibility: visible;
    }
}
</style>