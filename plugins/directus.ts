import type { RuntimeConfig } from "nuxt/schema";
import { createDirectus, authentication, rest } from "@directus/sdk";
import { useAuth } from "~/stores/auth";
import { CookieStorage } from "~/utils/CookieStorage";


export default defineNuxtPlugin(async (nuxtApp) => {

    // BASE CONFIG
    const runtimeConfig: RuntimeConfig = useRuntimeConfig(),
          storage:       CookieStorage = new CookieStorage(nuxtApp),
          directusUrl:   string        = runtimeConfig.public.directus as string
          
    // DIRECTUS INSTANCE
    const directus = createDirectus(directusUrl).with(rest()).with(authentication('json', {storage}));

    // DIRECTUS AUTHENTICATION
    const auth  = useAuth(),
          token = await directus.getToken(),
          side  = import.meta.env.SSR ? 'server' : 'client';
    
    // AUTHENTICATE 
    if(!auth.isLogged && token){
        
        console.warn('Token found, but no user is logged, logging in...');

        try {
            await auth.getUserData();
            console.log('User logged in successfully');
        } catch (error) {
            console.error('Error logging in user in ' + side, error);
        }

    }

    if(auth.isLogged && !token){
        
        console.warn('User logged in, but no token found, logging out...');

        auth.reset();

    }

    console.log('Directus instance created in ' + side);
    
    // REGISTER DIRECTUS INSTANCE
    nuxtApp.provide('directus', directus);
})