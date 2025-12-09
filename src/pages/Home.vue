<template>
    <div id="page-home">
        <div class="asciiTitleContainer">
            <pre class="asciiTitle"></pre>
        </div>
        <Navigation />
    </div>
</template>

<script setup>
import {ref, onMounted} from "vue"
import Navigation from "../components/Navigation.vue"

const currentPage = defineModel()

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

const initSiteTitle = () => {
    const e = document.querySelector(".asciiTitle")
    setTimeout(() => e.innerHTML = title.value.bin, 2000)
    setTimeout(() => e.innerHTML = title.value.ascii, 3833)
}

// set up "initializing..." effect
onMounted(() => {
    initSiteTitle()
    appendClass(".crtContainer", "vignette")
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

@keyframes slideUp {
    from { max-height: 100vh }
    to { max-height: 0 }
}

@keyframes slideDown {
  from { max-height: 0 }
  to { max-height: 100vh }
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