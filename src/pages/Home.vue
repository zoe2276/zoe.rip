<template>
    <div id="page-home">
        <div class="asciiTitleContainer">
            <pre class="asciiTitle"></pre>
        </div>
        <Console delay="10"/>
    </div>
</template>

<script setup>
import {ref, onMounted} from "vue"
import Navigation from "../components/Navigation.vue"
import Console from "../components/Console.vue"

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

const initSiteTitle = () => {
    const e = document.querySelector(".asciiTitle")
    setTimeout(() => e.innerHTML = title.value.bin, 2000)
    setTimeout(() => e.innerHTML = title.value.ascii, 3833)
}

// set up "initializing..." effect
onMounted(() => {
    initSiteTitle()
})
</script>

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