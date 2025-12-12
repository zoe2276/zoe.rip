<template>
    <div>
        <div>
            <div id="consoleOutput">
                <Navigation />
            </div>
        </div>
        <div style="position: relative;">
            <div id="caret" ref="caretEl" class="caret" :style="caretDynamicStyle" />
            <span id="consoleInput-container">
                <input id="consoleInput"
                autofocus
                autocorrect="false"
                    autocomplete="false"
                    autocapitalize="false"
                    autosave="false"
                    spellcheck="false"
                    @input="updateCaret"
                    @keydown="scheduleUpdate"
                    @click="updateCaret"
                    @focus="startBlink"
                    @blur="stopBlink"
                    @keyup.enter="sendCommand"
                    ref="caretInputEl" />
                </span>
            </div>
    </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
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
        appendToOutput(`unknown command: ${command}`)
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

// caret positioning
const caretEl = ref(null) // document.querySelector("#caret")
const caretInputEl = ref(null)
const text = ref('')

const caretX = ref(0)
const caretVisible = ref(true)

let blinkTimer = null
let mirrorEl = null // mirrors the input to provide caret position

const assertMirror = input => {
    if (mirrorEl) return mirrorEl
    mirrorEl = document.createElement("div")
    mirrorEl.style.position = "absolute"
    mirrorEl.style.left = "-99999px"
    mirrorEl.style.top = "-99999px"
    mirrorEl.style.whiteSpace = "pre"
    mirrorEl.style.visibility = "hidden"
    mirrorEl.style.pointerEvents = "none"
    document.body.appendChild(mirrorEl)
    return mirrorEl
}

const updateCaret = () => {
    const input = caretInputEl.value
    const caret = caretEl.value
    if (!input || !caret) return

    const selStart = input.selectionStart ?? 0
    
    const computedStyles = getComputedStyle(input)
    
    // copy all styles that affect text width
    const mirror = assertMirror(input)
    mirror.style.fontFamily = computedStyles.fontFamily
    mirror.style.fontSize = computedStyles.fontSize
    mirror.style.fontWeight = computedStyles.fontWeight
    mirror.style.fontStyle = computedStyles.fontStyle
    mirror.style.letterSpacing = computedStyles.letterSpacing
    mirror.style.textTransform = computedStyles.textTransform
    mirror.style.textRendering = "optimizeLegibility"
    mirror.textContent = input.value.slice(0, selStart)
    
    const textWidth = mirror.offsetWidth
    
    const paddingLeft = parseFloat(computedStyles.paddingLeft) || 0
    const borderLeft = parseFloat(computedStyles.borderLeftWidth) || 0
    const scrollLeft = input.scrollLeft || 0

    let x = borderLeft + paddingLeft + textWidth - scrollLeft // calc native caret x position

    // keep caret inbounds
    const paddingRight = parseFloat(computedStyles.paddingRight) || 0
    const minX = borderLeft + paddingLeft
    const maxX = input.clientWidth - paddingRight - 1
    x = Math.max(minX, Math.min(maxX, x))

    caretX.value = x

    const caretTop = parseFloat(computedStyles.borderTopWidth || 0) + parseFloat(computedStyles.paddingTop || 0) // lol
    const lineHeight = parseFloat(computedStyles.lineHeight)
    const height = Number.isFinite(lineHeight) ? lineHeight : input.clientHeight - (parseFloat(computedStyles.paddingTop || 0) + parseFloat(computedStyles.paddingBottom || 0))

    caretEl.value.style.top = `${caretTop}px` // still funny
    caretEl.value.style.height = `${height}px`
    caretEl.value.style.left = `${caretX.value}px`
}

const scheduleUpdate = () => requestAnimationFrame(updateCaret)

// blink
const startBlink = () => {
    caretVisible.value = true
    if (blinkTimer) clearInterval(blinkTimer)
    blinkTimer = setInterval(() => (caretVisible.value = !caretVisible.value), 500)
}

const stopBlink = () => {
    if (blinkTimer) clearInterval(blinkTimer)
    blinkTimer = null
caretVisible.value = false
}

const caretDynamicStyle = computed(() => ({
    opacity: caretVisible.value ? 1 : 0,
}))

onMounted(() => {
    // delay showing until ready
    const inputContainer = document.querySelector("#consoleInput-container:not(.shown)")
    inputContainer.setAttribute("style", `animation: type 1s steps(1, end) ${props.delay}s;`)
    setTimeout(() => inputContainer.classList.add("shown"), props.delay * 1001)

    setTimeout(() => nextTick(updateCaret), 3000)
    // recompute on window resize since stuff can change
    window.addEventListener('resize', updateCaret)
})

// cleanup
onUnmounted(() => {
    window.removeEventListener('resize', updateCaret)
    if (mirrorEl && mirrorEl.parentNode) mirrorEl.parentNode.removeChild(mirrorEl)
    mirrorEl = null
    stopBlink ()
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
.caret {
    position: absolute;
    width: 0;

    border-right: 0.66rem solid #42b983ee;
    pointer-events: none;
    height: 1.25rem;
    /* background-color: #42b983ee; */
}
</style>