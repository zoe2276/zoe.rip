<template>
    <div>
        <div>
            <div id="consoleOutput" ref="outputEl">
                <Navigation @handleClick="typeIntoInput" />
            </div>
        </div>
        <div style="position: relative;">
            <div id="caret" ref="caretEl" :style="caretStyle" />
            <span id="consoleInput-container">
                <input id="consoleInput"
                    autofocus
                    autocorrect="false"
                    autocomplete="false"
                    autocapitalize="false"
                    autosave="false"
                    spellcheck="false"
                    @input="scheduleUpdate"
                    @keydown="scheduleUpdate"
                    @click="scheduleUpdate"
                    @keyup.enter="sendCommand"
                    ref="inputEl" 
                />
            </span>
        </div>
    </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCaret } from "../composables/caret"
import Navigation from './Navigation.vue'

const props = defineProps(['delay'])
const router = useRouter()

const outputEl = ref(null)
const inputEl = ref(null)

const appendToOutput = text => {
    const vEl = document.createElement("p")
    vEl.innerHTML = text
    const oEl = outputEl.value
    // random small delay to help prevent spam
    setTimeout(() => oEl.appendChild(vEl), Math.random() * 250)
}

const sendCommand = (e) => {
    const input = e.target.value
    appendToOutput(input)
    // process command

    const [command, ...args] = input.split(" ")
    if (command === "cd") {
        setTimeout(() => navigateTo(args[0]), 750)
    } else {
        appendToOutput(`unknown command: ${command}`)
    }
    // reset input
    e.target.value = ""
}

// simulate running commands
const typeIntoInput = text => {
    const iEl = inputEl.value
    if (!iEl) return
    for (let char in text.split("")) {
        setTimeout(() => iEl.dispatchEvent(new KeyboardEvent("keyup", { key: char })), 75)
    }
    iEl.dispatchEvent(new KeyboardEvent("keyup", {
        key: "enter"
    }))
}

const navigateTo = (path) => {
    if (path === "..") {
        router.back()
    } else {
        try {
            router.push({path: path})
        } catch {
            try { 
                router.push({ name: path })
            } catch {
                appendToOutput(`path "${path}" not found.`)
            } 
        }        
    }
}

// caret positioning
const caretEl = ref(null)
const text = ref(null)

const {caretStyle, scheduleUpdate} = useCaret({
    target: inputEl,
    caret: caretEl
})


onMounted(() => {
    // delay showing until ready
    const inputContainer = document.querySelector("#consoleInput-container:not(.shown)")
    inputContainer.setAttribute("style", `animation: type 1s steps(1, end) ${props.delay}s;`)
    setTimeout(() => inputContainer.classList.add("shown"), props.delay * 1001)
})

</script>

<style scoped>
#consoleOutput {
    text-align: left;
}

#consoleInput {
    color:#42b983ee;
    caret-color: transparent;
    background: transparent;
    border: none;
    width: 100%;
    line-height: 1.25rem;
    font-family:'Courier New', Courier, monospace;
    font-size: 1rem;
    text-shadow: 0 0 1rem #42b983aa;
    
    align-self: flex-start;

    &:focus {
        border: none;
        outline: none;
    }

}

#consoleInput-container {
    position: relative;
    display: block;
    width: 0;
    height: 0;

    &.shown {
        width: 100%;
        height: auto;

        &::before {
            content: ">";
        }
    }
    &::before {
        content: "";
        position: absolute;
        left: -1.25rem;
        font-weight: 600;
        line-height: 1.25;
    }
}
</style>

<style>
#caret {
    visibility: hidden;
}

@keyframes blink {
    0% {opacity: 1}
    50% {opacity: 0}
    100% { opacity: 1}
}

 .blinking {
    visibility: visible !important;
    animation: blink 1s step-end infinite
 }
</style>