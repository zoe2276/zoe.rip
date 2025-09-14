<template>
    <div>
        <button @click="count++" @mousemove="e => updateShadowPos(e, true)" @mouseleave="resetElementShadow">
            Clicks: {{ count }}
        </button>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { updateShadowPos, resetElementShadow } from '../composables/glow';

const count = ref(0)
</script>

<style scoped>
button {
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 8px;

    will-change: filter;
    transition: filter 137ms cubic-bezier(0.5, 0, 1, 2);
}
</style>