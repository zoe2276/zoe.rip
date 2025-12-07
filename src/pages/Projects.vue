<template>
    <div id="page-projects">
        <pre>these are my projects</pre>
        <div>
            <ul>
                <Project title="monitorman" link="https://github.com/zoe2276/monitorman" description="a monitor dimension manager written in Java. work in progress" />
                <Project title="yRTC" link="https://github.com/zoe2276/yrtc" description="a custom RTC client" />
            </ul>
        </div>
        <Navigation v-model="currentPage"/>
    </div>
</template>

<script setup>
import Navigation from '../components/Navigation.vue';
import Project from '../components/Project.vue';
const currentPage = defineModel()
</script>

<style>
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
#page-projects {
    animation: slideDown 1s steps(17, end) forwards;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
}
</style>