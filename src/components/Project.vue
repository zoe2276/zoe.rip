<template>
    <div class="projectContainer">
        <li><h3><em>{{ title }}</em></h3></li>
            <ul><li><a :href="link" target="_blank" v-if="link">{{ description }}</a><span v-else>{{  description }}</span></li></ul>
    </div>
</template>

<script setup>
defineProps(["title", "link", "description"])
</script>

<style scoped>
.projectContainer {
    margin-bottom: 12px;
}

ul, li {
    width: fit-content;
    place-self: center;
    list-style: none;
}
</style>