<template>
    <div id="page-home">
        <div class="asciiTitleContainer">
            <pre class="asciiTitle"></pre>
        </div>
        <Navigation />
    </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from "vue"
import Navigation from "../components/Navigation.vue"


const binaryTitle = "01111010 01101111 01100101 00101110 01110010 01101001 01110000"
const asciiTitle = `
                                                 *                
                                               *   *              
                                                 *                
  ******      ****                ***  ***                ****    
 ********    * ***  *    ***       **** **** * ***       * ***  * 
**     **   *   ****    * ***       **   ****   ***     *   ****  
*      *   **    **    *   ***      **           **    **    **   
      *    **    **   **    ***     **           **    **    **   
     ***   **    **   ********      **           **    **    **   
      ***  **    **   *******       **           **    **    **   
       *** **    **   **       *    **           **    **    **   
        **  ******    ****   **     ***          **    *******    
        **   ****      *******        **         *** * ******     
        *               *****    *                ***  **         
       *                        ***                    **         
      *                          *                     **         
    **                                                  **        
`
const title = ref({ bin: binaryTitle, ascii: asciiTitle })

const appendClass = (selector, className, delay = 0, first) => {
    (first ? [document.querySelector(`${selector}:not(.${className})`)].filter(Boolean) : document.querySelectorAll(selector)).forEach(e => setTimeout(() => e.classList.add(className), delay))
}

const removeClass = (selector, className) => {
    document.querySelectorAll(selector).forEach(e => e.classList.remove(className))
}

const initSiteTitle = () => {
    const e = document.querySelector(".asciiTitle")
    setTimeout(() => e.innerHTML = title.value.bin, 2000)
    setTimeout(() => e.innerHTML = title.value.ascii, 3833)
}

const typeNavTarget = () => {
    const navTargets = document.querySelectorAll(".navtarget:not(.shown)")
    let delay = 6
    for (let i = 0; i < navTargets.length; i++) {
        const el = navTargets[i]
        const charCount = el.innerHTML.length
        const typeDuration = charCount / (i === 0 ? 15 : 7)
        const styleString = `animation: type ${typeDuration}s steps(${charCount}, end) ${delay}s, grow 1ms steps(1, end) ${delay}s;`
        el.setAttribute("style", styleString)
        setTimeout(() => el.classList.add("shown"), delay * 1001)
        delay += typeDuration
    }
}

// set up "initializing..." effect
onMounted(() => {
    initSiteTitle()
    appendClass(".crtContainer", "vignette")
    typeNavTarget()
})

// cleanup
onUnmounted(() => {
    removeClass(".crtContainer", "vignette")
    removeClass(".navtarget", "typing")
})

</script>

<style>
@keyframes type {
    from { width: 0; }
    to { width: 100% }
}

@keyframes grow {
    from { height: 0 }
    to { height: auto }
}
</style>

<style scoped>
#page-home {
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
}

.asciiTitle {
    color: #42b983;
    justify-self: center;
    line-height: 1;
    overflow: hidden;
    overflow-y: hidden;
    /* white-space: nowrap;  */
    
    animation: type 2s steps(63, end) 2s forwards, slideUp 333ms linear 3s forwards, slideDown 1s steps(17, end) 3833ms forwards;
}
</style>