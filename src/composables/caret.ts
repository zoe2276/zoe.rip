import { ref, computed, nextTick, onMounted, onUnmounted, type Ref, watch } from "vue"

export interface UseCaretOptions {
    target: Ref<HTMLInputElement | null>
    caret: Ref<HTMLElement | null>
    thickness?: number
    color?: string
    blinkInterval?: number
    hideNativeCaret?: boolean
    useCanvasMeasure?: boolean
}

export interface UseCaretResult {
    caretVisible: Ref<boolean>
    caretStyle: ReturnType<typeof computed>
    update: () => void
    scheduleUpdate: () => void
    startBlink: () => void
    stopBlink: () => void
    dispose: () => void
}

export const useCaret = (options: UseCaretOptions): UseCaretResult => {
    const {
        target, caret,
        thickness = 10,
        color = "#42b983aa",
        blinkInterval = 500,
        hideNativeCaret = true,
        useCanvasMeasure = false
    } = options

    const caretVisible = ref(true)
    const x = ref(0)
    const y = ref(0)
    const height = ref(16)

    let mirrorEl: HTMLDivElement | null = null
    let blinkTimer: number | null = null
    let listenersBound = false
    let savedCaretColor: string | null = null
    let isComposing = false

    const caretStyle = computed({
        get: () => ({
        position: "absolute",
        width: "0px",
        borderRight: `${thickness}px solid ${color}`,
        left: `${x.value}px`,
        top: `${y.value}px`,
        height: `${height.value}px`,
        opacity: caretVisible ? 1 : 0,
        pointerEvents: "none"
    }), set: () => {}})

    const assertMirror = (): HTMLDivElement => {
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
    
    const canvasMeasureWidth = (text: string, computedStyle: CSSStyleDeclaration): number => {
        const canvas = document.createElement("canvas")
        const cx = canvas.getContext("2d")
        if (!cx) return 0
        const weight = computedStyle.fontWeight || "normal"
        const size = computedStyle.fontSize || "1rem"
        const family = computedStyle.fontFamily || "'Courier New', Courier, monospace"
        const style = computedStyle.fontStyle || "normal"
        cx.font = `${style} ${weight} ${size} ${family}`
        return cx.measureText(text).width
    }

    const measureInputCaret = (input: HTMLInputElement) => {
        const selStart = input.selectionStart ?? 0
        const computedStyle = getComputedStyle(input)

        const borderTop = parseFloat(computedStyle.borderTopWidth || "0") || 0
        const paddingTop = parseFloat(computedStyle.paddingTop || "0") || 0
        const paddingBottom = parseFloat(computedStyle.paddingBottom || "0") || 0
        let lineH = parseFloat(computedStyle.lineHeight || "0")
        if (!Number.isFinite(lineH) || !lineH) {
            lineH = input.clientHeight - paddingTop - paddingBottom
        }
        height.value = Math.max(1, Math.round(lineH))
        y.value = Math.round(borderTop + paddingTop)

        const borderLeft = parseFloat(computedStyle.borderLeftWidth || "0") || 0
        const paddingLeft = parseFloat(computedStyle.paddingLeft || "0") || 0
        const paddingRight = parseFloat(computedStyle.paddingRight || "0") || 0
        const scrollLeft = input.scrollLeft || 0 // helps us stay in visual bounds

        const textUpToCaret = input.value.slice(0, selStart)
        let textWidth = 0

        if (useCanvasMeasure) { // less precise but i may be able to use it over the old mirror el method
            textWidth = canvasMeasureWidth(textUpToCaret, computedStyle)
        } else {
            const mr = assertMirror()
            mr.style.fontFamily = computedStyle.fontFamily
            mr.style.fontSize = computedStyle.fontSize
            mr.style.fontWeight = computedStyle.fontWeight
            mr.style.fontStyle = computedStyle.fontStyle
            mr.style.letterSpacing = computedStyle.letterSpacing
            mr.style.textTransform = computedStyle.textTransform
            mr.style.textRendering = "optimizeLegibility"
            mr.textContent = textUpToCaret
            textWidth = mr.offsetWidth
        }

        let caretX = borderLeft + paddingLeft + textWidth - scrollLeft
        
        // clamp to visible area
        const maxX = input.clientWidth - (parseFloat(computedStyle.borderRightWidth || "0") || 0) - paddingRight - 1
        const minX = borderLeft + paddingLeft
        caretX = Math.max(minX, Math.min(maxX, caretX))

        x.value = Math.round(caretX)
    }

    const update = () => {
        const el = target.value
        const cr = caret.value
        if (!el || !cr) return
        if (isComposing) return // kinda debounce

        measureInputCaret(el)
    }

    const scheduleUpdate = () => requestAnimationFrame(update)

    const startBlink = () => {
        console.log("startBlink")
        // caretVisible.value = true
        // if (blinkTimer) {
        //     clearInterval(blinkTimer)
        //     blinkTimer = null
        // }
        // blinkTimer = window.setInterval(() => caretVisible.value = !caretVisible.value, blinkInterval)
        caret.value?.classList.add("blinking")
    }

    const stopBlink = () => {
        console.log("stopBlink")
        // if (blinkTimer) {
        //     clearInterval(blinkTimer)
        //     blinkTimer = null
        // }
        // caretVisible.value = false
        caret.value?.classList.remove("blinking")

    }

    const bindListeners = (el: HTMLInputElement) => {
        if (listenersBound) return
        if (hideNativeCaret) {
            const computedStyle = getComputedStyle(el)
            savedCaretColor = computedStyle.caretColor || null;
            (el.style as any).caretColor = "transparent"
        }

        el.addEventListener("input", update)
        el.addEventListener("keydown", scheduleUpdate)
        el.addEventListener("click", update)
        el.addEventListener("focus", () => {
            startBlink()
            scheduleUpdate()
        })
        el.addEventListener("blur", () => stopBlink())

        
        // helps for IME input - otherwise it jitters
        el.addEventListener('compositionstart', () => isComposing = true)
        el.addEventListener('compositionend', () => {
            isComposing = false
            scheduleUpdate()
        })

        window.addEventListener("resize", update)
        listenersBound = true
    }

    const unbindListeners = (el: HTMLInputElement) => {
        if (!listenersBound) return

        el.removeEventListener("input", update)
        el.removeEventListener("keydown", scheduleUpdate)
        el.removeEventListener("click", update)
        el.removeEventListener("focus", startBlink as EventListener)
        el.removeEventListener("blur", stopBlink as EventListener)
        el.removeEventListener("compositionstart", () => {})
        el.removeEventListener("compositionend", () => {})
        window.removeEventListener("resize", update)

        // reset the native caret
        if (hideNativeCaret) {
            if (savedCaretColor !== null) {
                (el.style as any).caretColor = savedCaretColor
            } else (el.style as any).caretColor = ""
            savedCaretColor = null
        }
        listenersBound = false
    }

    const dispose = () => {
        const el = target.value
        if (el) unbindListeners(el)
        if (blinkTimer) {
            clearInterval(blinkTimer)
            blinkTimer = null
        }
        if (mirrorEl && mirrorEl.parentNode) {
            mirrorEl.parentNode.removeChild(mirrorEl)
            mirrorEl = null
        }
    }

    // handle lifecycle
    onMounted(() => {
        nextTick(() => {
            const el = target.value
            if (!el) return
            bindListeners(el)
            scheduleUpdate()
        })
    })
    onUnmounted(() => dispose())

    // if the target ref changes, we need to rebind
    watch(target, (newEl, oldEl) => {
        if (oldEl) unbindListeners(oldEl)
        if (newEl) {
            bindListeners(newEl)
            scheduleUpdate()
        }
    })
    
    return {
        caretVisible,
        caretStyle,
        update,
        scheduleUpdate,
        startBlink,
        stopBlink,
        dispose
    }
}


/* old stuff
export const updateCaret = (inputEl: Ref, caretEl: Ref, caretX: Ref): FrameRequestCallback => {
    const input = inputEl.value
    const caret = caretEl.value
    if (!input) console.log("input empty, returning")
    if (!caret) console.log("caret empty, returning")
    if (!input || !caret) return () => {}

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
    const paddingRight = parseFloat(computedStyles.paddingRight || "0")
    const minX = borderLeft + paddingLeft
    const maxX = input.clientWidth - paddingRight - 1
    x = Math.max(minX, Math.min(maxX, x))

    caretX.value = x

    const caretTop = parseFloat(computedStyles.borderTopWidth || "0") + parseFloat(computedStyles.paddingTop || "0") // lol
    const lineHeight = parseFloat(computedStyles.lineHeight)
    const height = Number.isFinite(lineHeight) ? lineHeight : input.clientHeight - (parseFloat(computedStyles.paddingTop || "0") + parseFloat(computedStyles.paddingBottom || "0"))

    caretEl.value.style.top = `${caretTop}px` // still funny
    caretEl.value.style.height = `${height}px`
    caretEl.value.style.left = `${caretX.value}px`
    return () => {}
}

export const scheduleUpdate = (inputEl: Ref, caretEl: Ref, caretX: Ref) => requestAnimationFrame(updateCaret(inputEl, caretEl, caretX))

// blink
export const startBlink = (caretVisible: Ref | boolean, blinkTimer: number) => {
    caretVisible = true
    if (blinkTimer) clearInterval(blinkTimer)
    blinkTimer = setInterval(() => (caretVisible = !caretVisible), 500)
}

export const stopBlink = (caretVisible: Ref | boolean, blinkTimer: number | null) => {
    if (blinkTimer) clearInterval(blinkTimer)
    blinkTimer = null
    caretVisible = false
}

export const caretDynamicStyle = (caretVisible: Ref | boolean) => ({
    opacity: caretVisible ? 1 : 0,
})
*/