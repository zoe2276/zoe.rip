<template>
    <div>
        <button @click="count++" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
            Clicks: {{ count }}
        </button>
    </div>
</template>

<script>
import { updateShadowPos, resetElementShadow } from '../composables/glow';

export default {
    name: "Counter",
    data() {
        return {
            count: 0
        }
    },
    methods: {
        handleMouseMove(event) {
            updateShadowPos(event, true)
        },
        handleMouseLeave(event) {
            resetElementShadow(event)
        }
    }
}
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