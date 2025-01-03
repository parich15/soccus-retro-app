import anime from "animejs"

export default defineNuxtPlugin(nuxtApp => {

    return nuxtApp.provide('anime', anime)

})