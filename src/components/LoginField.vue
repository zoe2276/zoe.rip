<template>
    <div class="loginField-container" v-if="props.type === 'username'">
        <!-- <div> -->
            <span class="label-username" :id="`label-${type}`">username:</span>
        <!-- </div> -->
        <input id="loginForm-username" v-model="username" type="text" @blur="checkForValue" @input="updateCaretPos"/>
        <div class="caret" :id="`${type}-caret`" />
    </div>
    <div class="loginField-container" v-else-if="props.type === 'password'">
        <!-- <div> -->
            <span class="label-password" :id="`label-${type}`">password:</span>
        <!-- </div> -->
        <input id="loginForm-password" v-model="password" type="password" @blur="checkForValue" @keyup.enter="submit" />
        <div class="caret" :id="`${type}-caret`" />
    </div>
    <div v-else-if="props.type === 'submit'">
        <button @click="submit">submit</button>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { backspaceEffect, typeEffect } from '../composables/typewriter';

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

onUnmounted(() => {
    backspaceEffect(`.label-${props.type}`, 20, 0)
})

// handle the caret positioning
const updateCaretPos = () => {
    /** Measure the width of provided text using an invisible canvas */
    const measureWidth = (text, font) => {
        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")
        context.font = font
        const metrics = context.measureText(text)
        return metrics.width
    }

    const inputEl = document.getElementById(`loginForm-${props.type}`)
    const caretEl = document.getElementById(`${props.type}-caret`)
    const labelEl = document.getElementById(`label-${props.type}`)

    const text = inputEl.value
    const inputStyles = window.getComputedStyle(inputEl)
    const font = `${inputStyles.getPropertyValue("font-size")} ${inputStyles.getPropertyValue("font-family")}`
    const paddingLeft = parseInt(inputStyles.getPropertyValue("padding-left"))
    const textWidth = measureWidth(text, font) + paddingLeft
    
    const caretWidth = caretEl.getBoundingClientRect().width
    const inputWidth = inputEl.getBoundingClientRect().width
    const labelWidth = labelEl.getBoundingClientRect().width

    if (textWidth + caretWidth < inputWidth) {
        caretEl.style.transform = `translate(${textWidth + labelWidth + caretWidth}px, -50%)`
    }
}
</script>

<style>
    @keyframes blink {
        from { background-color: #42b983ee; }
        to { background-color: transparent; }
    }
</style>

<style scoped>
.loginField-container {
    position: relative;
    display: flex;
}
input {
    color:#42b983ee;
    caret-color: transparent;
    /* caret-color: #42b983ee; */
    /* caret-animation: auto; */
    /* caret-shape: block; */
    background: transparent;
    border: none;
    /* border-left: 0.66rem solid #42b983ee !important; */
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
.caret {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(96.9688px, -50%);
    
    opacity: 0;

    width: 0.66rem;
    height: 1.25rem;
    /* background-color: #42b983ee; */

    animation: blink 1s steps(2, end) infinite;
}
input:focus ~ .caret {
    opacity: 1;
}
</style>