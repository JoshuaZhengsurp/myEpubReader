import { createRouter, createWebHashHistory } from "vue-router";

import ebook from '../view/Ebook.vue'

const routes = [
    {
        path:'/',
        redirect: 'ebook',
    },
    {
        path: '/ebook',
        name: 'Ebook',
        component: ebook,
    }
];

export default createRouter({
    history: createWebHashHistory(),
    routes
})
