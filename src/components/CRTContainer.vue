<!-- provide a CRT display overlay as the root component -->
<template>
    <div class="crtContainer">
        <div class="asciiTitleContainer" @mousemove="e => updateShadowPos(e)" @mouseleave="resetElementShadow">
            <pre class="asciiTitle"></pre>
        </div>
        <Navigation />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { resetElementShadow, updateShadowPos } from "../composables/glow"
import Navigation from "./Navigation.vue"

const binaryTitle = "01111010 01101111 01100101 00101110 01110010 01101001 01110000"
const asciiTitle = `
                                                 *                
                                               *   *              
                                                 *                
  ******      ****                ***  ***                ****    
 ********    * ***  *    ***       **** **** * ***       * ***  * 
*      **   *   ****    * ***       **   ****   ***     *   ****  
       *   **    **    *   ***      **           **    **    **   
      *    **    **   **    ***     **           **    **    **   
     ***   **    **   ********      **           **    **    **   
      ***  **    **   *******       **           **    **    **   
       *** **    **   **       *    **           **    **    **   
        **  ******    ****   **     ***          **    *******    
        **   ****      *******        **         *** * ******     
        *               *****    *                ***  **         
       *                        ***                    **         
      *                          *                     **         
     *                                                  **        
`
const title = ref({ bin: binaryTitle, ascii: asciiTitle })

class TypeText {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate
        this.el = el
        this.loopIter = 0
        this.period = parseInt(period, 10) || 2000
        this.txt = ""
        this.tick()
        this.isDeleting = false
    }
    tick() {
        let i = this.loopIter % this.toRotate.length
        const fullTxt = this.toRotate[i]

        this.txt = fullTxt.substring(0, this.txt.length + (this.isDeleting ? -1 : 1))
        this.el.innerHTML = `<pre class="asciiTitle">${this.txt}</pre>`

        const that = this
        let delta = this.loopIter === 0 ? 66 - Math.random() * 50 : 1

        if (this.isDeleting) { delta /= 3 }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period
            this.isDeleting = true
        } else if (this.isDeleting && this.txt === "") {
            if (i !== this.toRotate.length) {
                this.isDeleting = false
                this.loopIter++
                delta = 10
                
                setTimeout(() => that.tick(), delta)
            }
        }
    }
}


const appendClass = (selector, className, delay = 0) => {
    document.querySelectorAll(selector).forEach(e => setTimeout(() => e.classList.add(className), delay))
}

const removeClass = (selector, className) => {
    document.querySelectorAll(selector).forEach(e => e.classList.remove(className))
}

const initSiteTitle = () => {
    const e = document.querySelector(".asciiTitle")
    e.innerHTML = title.value.bin
    setTimeout(() => e.innerHTML = title.value.ascii, 1833)
    // appendClass(".asciiTitle", "p0") // type
    // setTimeout(() => removeClass(".asciiTitle", "p0"), 1000)
    // appendClass(".asciiTitle", "p1") // slideUp
    // setTimeout(() => removeClass(".asciiTitle", "p1"), 333)
    // e.innerHTML = title.value.ascii
    // appendClass(".asciiTitle", "p2") // slideDown
    // setTimeout(() => removeClass(".asciiTitle", "p2"), 1000)
}

// set up "initializing..." effect
onMounted(() => {
    // bin -> ascii art effect - the js way
    // document.querySelectorAll(".asciiTitleContainer").forEach(e => {
    //     const toRotate = [title.value.bin, title.value.ascii]
    //     const period = 500
    //     if (toRotate) {
    //         new TypeText(e, toRotate, period)
    //     }
    // })
    initSiteTitle()
    appendClass(".crtContainer", "vignette")
    appendClass(".navtarget", "shown", 3000)
})

// cleanup
onUnmounted(() => {
    removeClass(".crtContainer", "vignette")
    removeClass(".navtarget", "typing")
})
</script>

<style scoped>
.crtContainer {
    
    position: relative;
    width: 100vw;
    height: 100vh;

    will-change: border, border-radius, box-shadow, padding;
    transition: border 2s cubic-bezier(0.75, 1, 0.25, 1), border-radius  2s cubic-bezier(0.75, 1, 0.25, 1), box-shadow 2s cubic-bezier(0.75, 1, 0.25, 1), padding 2s cubic-bezier(0.75, 1, 0.25, 1);

    &::after {
        pointer-events: none;
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 90vw;
        height: 90vh;
        /* width: calc(99vw - 10vmin);
        height: calc(99vh - 10vmin); */

        background-color: none;
        border: 0 solid #000F;
        box-shadow: none;

        will-change: border, border-radius, box-shadow, padding;
        transition: border 2s cubic-bezier(0.75, 1, 0.25, 1), border-radius  2s cubic-bezier(0.75, 1, 0.25, 1);
    }

    &.vignette {
        background-color: #2F2F35;
        padding: 6vh 6vw;

        &::after {
            border-top: 5vh solid #2F2F35;
            border-bottom: 5vh solid #2F2F35;
            border-left: 5vw solid #2F2F35;
            border-right: 5vw solid #2F2F35;
            border-radius: 12vmin;
            box-shadow: inset 0 0 20vmin 5vw #0007;
        }
    }
}

.asciiTitle {
    color: #42b983;
    justify-self: center;
    line-height: 1;
    overflow: hidden;
    overflow-y: hidden;
    /* white-space: nowrap; */
    
    animation: type 1.5s steps(63, end), slideUp 333ms steps(10, end) 1.5s, slideDown 1s steps(17, end) 1333ms;
}

@keyframes type {
    from { width: 0 }
    to { width: 100% }
}

@keyframes slideUp {
    from { max-height: 100vh }
    to { max-height: 0 }
}

@keyframes slideDown {
  from { max-height: 0 }
  to { max-height: 100vh }
}
</style>