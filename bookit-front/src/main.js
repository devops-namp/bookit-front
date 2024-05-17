import { createApp } from 'vue'
import { createRouter, createWebHistory } from "vue-router"
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'vue3-toastify/dist/index.css'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import { faSuitcase } from '@fortawesome/free-solid-svg-icons'

library.add(faSuitcase)

import MainPage from './components/Main/MainPage.vue'
import LoginPage from './components/Login/LoginPage.vue'
import SignUpPage from './components/SignUp/SignUpPage.vue'

const routes = [
    {
        path: "/",
        component: LoginPage
    },
    {
        path: "/main",
        component: MainPage
    },
    {
        path: "/signup",
        component: SignUpPage
    }
]

const router = createRouter({
    history: createWebHistory(""),
    routes,
});

const app = createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon);
app.component('VueDatePicker', VueDatePicker);
app.mount("#app");
