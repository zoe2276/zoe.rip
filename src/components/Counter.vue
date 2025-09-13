<template>
    <div>
        <button @click="count++">
            Clicks: {{ count }}
        </button>
    </div>
</template>

<script>
export default {
    name: "Counter",
    data() {
        return {
            count: 0
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

    &:hover {
        filter: drop-shadow(0 0 2.9vmin #42b98377);
    }
}
</style>