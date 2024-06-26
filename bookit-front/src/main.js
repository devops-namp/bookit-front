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
import momentPlugin from './plugins/moment-plugin';
import store from './store/store.js'
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';


import { faSuitcase } from '@fortawesome/free-solid-svg-icons'
library.add(faSuitcase)

import MainPage from './components/Main/MainPage.vue'
import LoginPage from './components/Login/LoginPage.vue'
import SignUpPage from './components/SignUp/SignUpPage.vue'
import SearchPage from './components/Search/SearchPage.vue'
import PropertyListPage from './components/PropertyList/PropertyListPage.vue'
import PropertyDetailPage from './components/PropertyDetail/PropertyDetailPage.vue'
import ProfilePage from './components/Profile/ProfilePage.vue'
import TripHistoryPage from './components/TripHistory/TripHistoryPage.vue'
import MyReservationsPage from './components/Reservations/MyReservationPage.vue'
import OwnerReservationsPage from './components/Reservations/OwnerReservationsPage.vue'
import MyPropertiesPage from './components/Property/MyPropertiesPage.vue'
import NotificationPage from './components/Main/NotificationPage.vue'
import ConfirmationCodePage from './components/SignUp/ConfirmationCodePage.vue'
import ChangePasswordPage from './components/Profile/ChangePasswordPage.vue'

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
    },
    {
        path: "/signup/confirm",
        component: ConfirmationCodePage
    },
    {
        path: "/search",
        component: SearchPage
    },
    {
        path: "/propertyListing",
        component: PropertyListPage
    },
    {
        path: "/propertyDetail/:id",
        component: PropertyDetailPage
    },
    {
        path: "/profile",
        component: ProfilePage
    },
    {
        path: "/tripHistory",
        component: TripHistoryPage
    },
    {
        path: "/myReservations",
        component: MyReservationsPage
    },
    {
        path: "/ownerReservations",
        component: OwnerReservationsPage
    },
    {
        path: "/myProperties",
        component: MyPropertiesPage
    },
    {
        path: "/updateProperty/:id",
        component: PropertyListPage,
    },
    {
        path: "/notificationSettings",
        component: NotificationPage,
    },
    {
        path: "/password",
        component: ChangePasswordPage
    }
]

const router = createRouter({
    history: createWebHistory(""),
    routes,
});

const app = createApp(App);
app.use(router);
app.use(store);
app.use(momentPlugin);
app.use(setupCalendar, {});
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)

app.component('font-awesome-icon', FontAwesomeIcon);
app.component('VueDatePicker', VueDatePicker);
app.mount("#app");

