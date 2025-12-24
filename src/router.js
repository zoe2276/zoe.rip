import { createWebHistory, createRouter } from "vue-router";

import Home from "./pages/Home.vue";
import About from "./pages/About.vue";
import Projects from "./pages/Projects.vue";
import Login from "./pages/Login.vue";

const routes = [
    { name: "./", path: "/", component: Home },
    { name: "./about", path: "/about", component: About },
    { name: "./projects", path: "/projects", component: Projects},
    { name: "./login", path: "/login", component: Login},
    { path: "/home", redirect: "/" }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router