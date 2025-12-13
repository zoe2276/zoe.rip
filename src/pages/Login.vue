<template>
    <div id="page-login">
        <div>
            <LoginField type="username" v-model:username="loginForm.username" @checkForValue="checkForUsername" />
            <LoginField type="password" v-model:password="loginForm.password" @checkForValue="checkForPassword" />
            <!-- <LoginField type="submit" @submit="submitLogin" v-if="hasUsername && hasPassword" /> -->
        </div>
        <Navigation position="top" />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Navigation from '../components/Navigation.vue';
import LoginField from '../components/LoginField.vue';

const hasUsername = ref(false);
const hasPassword = ref(false);
const loginForm = ref({username: "", password: ""})

const submitLogin = ({username, password}) => {
    console.log('submitting: ', { username, password })
}

const checkForUsername = e => e.target.value ? hasUsername.value = true : hasUsername.value = false 
const checkForPassword = e => e.target.value ? hasPassword.value = true : hasPassword.value = false
</script>

<style scoped>
#page-login {
    animation: slideDown 1s steps(17, end) forwards;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: flex-start;
    
    & > div {
        /* width: 100%; */
        
        display: flex;
        flex-flow: column nowrap;
    }
}
</style>