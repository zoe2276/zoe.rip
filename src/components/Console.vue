<template>
    <div>
        <div id="caret" />
        <div>
            <div id="consoleOutput">
                <Navigation />
            </div>
        </div>
        <div>
            <span id="consoleInput-container">
                <input id="consoleInput" autofocus autocorrect="false" autocomplete="false" autocapitalize="false" autosave="false" @keyup.enter="sendCommand" />
            </span>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navigation from './Navigation.vue'

const props = defineProps(['delay'])
const router = useRouter()

let outputEl = document.querySelector("#consoleOutput")
let inputEl = document.querySelector("#consoleInput")

const appendToOutput = text => {
    outputEl ??= document.querySelector("#consoleOutput")
    const vEl = document.createElement("p")
    vEl.innerHTML = text
    // random small delay to help prevent spam
    setTimeout(() => outputEl.appendChild(vEl), Math.random() * 250)
}

const sendCommand = (e) => {
    const input = e.target.value
    appendToOutput(input)
    // process command

    const [command, ...args] = input.split(" ")
    if (command === "cd") {
        setTimeout(() => navigateTo(args[0]), 750)
    } else {
        appendToOutput("unknown command: ", command)
    }
    // reset input
    e.target.value = ""
}

// simulate running commands
const typeIntoInput = text => {
    inputEl ??= document.querySelector("#consoleInput")
    for (char in text.split("")) {
        setTimeout(() => inputEl.value += char, 75)
    }
    inputEl.dispatchEvent(new KeyboardEvent("keyup", {
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

// delay showing until ready
onMounted(() => {
    const inputContainer = document.querySelector("#consoleInput-container:not(.shown)")
    inputContainer.setAttribute("style", `animation: type 1s steps(1, end) ${props.delay}s;`)
    setTimeout(() => inputContainer.classList.add("shown"), props.delay * 1001)
})

// caret positioning
const caretEl = document.querySelector("#caret")

const getCaretPos = () => {
    setTimeout(() => console.log(window.getSelection().getRangeAt(0)), 0)
}
let caretPos
// update caret pos callback function

// onMounted(() => {
//     const inputEl = document.querySelector("#consoleInput")
//     inputEl.addEventListener('keydown', e => {
//         // caretPos = getCaretPos()
//         // console.log(caretPos)
//         console.log(window.getSelection().getRangeAt(0))
//     })
// })
</script>

<style scoped>
#consoleOutput {
    text-align: left;
}

#consoleInput {
    color:#42b983ee;
    /* caret-color: transparent; */
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
        left: 4rem;
        font-weight: 600;
        line-height: 1.25;
    }
}
#caret {
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
</style>