<template>
    <div id="page-projects">
        <pre>these are my projects</pre>
        <div>
            <ul>
                <Project title="this website" link="https://github.com/zoe2276/zoe.rip" description="website made in Vue" />
                <Project title="auth.zoe.rip" link="https://github.com/zoe2276/go-auth" description="authentication backend for zoe.rip, written in Go" />
                <Project title="monitorman" link="https://github.com/zoe2276/monitorman" description="a monitor dimension manager written in Java. work in progress" />
                <Project title="yRTC" link="https://github.com/zoe2276/yrtc" description="a custom RTC client" />
            </ul>
            
        </div>
        <Console delay="3"/>
    </div>
</template>

<script setup>
import Project from '../components/Project.vue';
import Console from '../components/Console.vue';
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