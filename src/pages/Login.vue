<template>
    <div id="page-login">
        <div>
            <LoginField type="loginType" v-model="loginForm.loginType" @checkForValue="checkReturnedValue"/>
            <LoginField type="username" v-model="loginForm.username" @checkForValue="checkReturnedValue" />
            <LoginField type="email" v-model="loginForm.email" @checkForValue="checkReturnedValue" v-if="loginForm.loginType === 'register'" />
            <LoginField type="password" v-model="loginForm.password" @checkForValue="checkReturnedValue" />
            <LoginField type="validatePassword" v-model="loginForm.validatePassword" @checkForValue="checkReturnedValue" v-if="loginForm.loginType === 'register'"/>
            <span class="passwordWarning" v-if="loginErrorMessage">{{loginErrorMessage}}</span>
            <span class="successMessage" v-if="successMessage">{{successMessage}}</span>
            <LoginField type="submit" @submit="submitForm" />
        </div>
        <Navigation position="top" />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import Navigation from '../components/Navigation.vue'
import LoginField from '../components/LoginField.vue'
import { login, register } from "../composables/localApi"

const loginForm = ref({loginType: "login", username: "", email: "", password: "", validatePassword: ""})
const loginErrorMessage = ref("")
const successMessage = ref("")
const isSubmittable = ref(false)

const checkReturnedValue = (type, rv) => {
    if (type === "loginType") {
        loginErrorMessage.value = null
        successMessage.value = null
    }
    if (!rv) loginErrorMessage.value = `please provide a ${type}`
    if (rv && loginErrorMessage.value && loginErrorMessage.value === `please provide a ${type}`) loginErrorMessage.value = ""
    loginForm.value[type] = rv

    if (loginForm.value.loginType === "login") {
        if (loginForm.value.username && loginForm.value.password && !loginErrorMessage.value) isSubmittable.value = true
        else isSubmittable.value = false 
    } else {
        if (loginForm.value.username &&
            loginForm.value.email &&
            loginForm.value.password &&
            loginForm.value.validatePassword &&
            loginForm.value.password === loginForm.value.validatePassword &&
            !loginErrorMessage.value
        ) isSubmittable.value = true
        else isSubmittable.value = false
    }
}

const submitLogin = async () => {
    console.log('submitting for login: ', { username: loginForm.value.username, password: loginForm.value.password })
    return await login(loginForm.value.username, loginForm.value.password)
}
const submitRegister = async () => {
    console.log('submitting for registration: ', { username: loginForm.value.username, email: loginForm.value.email, password: loginForm.value.password })
    return await register(loginForm.value.username, loginForm.value.email, loginForm.value.password)
}

const submitForm = () => {
    if (loginForm.value.loginType === "register") {
        // submit
        if (loginForm.value.username && loginForm.value.email && loginForm.value.password) {
            submitRegister().then(() => {
                successMessage.value = "success! please login with your new credentials."
            }).catch(err => {
                console.log("error: ", err)
                err.json().then(errObj => {
                    console.log('json received')
                    loginErrorMessage.value = `Error: ${errObj.message}`
                }).catch(errJsonErr => {
                    console.log("error getting json", errJsonErr)
                    loginErrorMessage.value = errJsonErr.statusText
                })
            })
        } else {
            if (!loginForm.value.username) loginErrorMessage.value = "please provide a username"
            else if (!loginForm.value.password) loginErrorMessage.value = "please provide a password"
            else if (!loginForm.value.email) loginErrorMessage.value = "please provide an email address"
            else if (!loginForm.value.validatePassword || loginForm.value.password !== loginForm.value.validatePassword) loginErrorMessage.value = "passwords do not match"
        }
    } else {
        if (loginForm.value.username && loginForm.value.password) {
            loginErrorMessage.value = ""
            submitLogin().then(jwt => {
                window.localStorage.setItem("jwt", jwt.token)
                window.localStorage.setItem("jwtExpires", jwt.expiration)
                successMessage.value = "success! you have signed in."
            }).catch(err => {
                err.json().then(errObj => {
                    loginErrorMessage.value = `Error: ${errObj.message}`
                }).catch(err => {
                    loginErrorMessage.value = err.statusText
                })
            })
        } else {
            if (!loginForm.value.username) {
                loginErrorMessage.value = "please provide a username"
            }
            if (!loginForm.value.password) {
                loginErrorMessage.value = "please provide a password"
            }
        }
    }
}
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
        width: 66%;
        
        display: flex;
        flex-flow: column nowrap;
    }
}

.passwordWarning {
    color: #b94283aa;
    text-shadow: 0 0 1rem #b94283aa;
}
</style>