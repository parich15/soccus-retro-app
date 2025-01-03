import { readMe } from "@directus/sdk";
import { defineStore } from "pinia";
import type { Auth } from "~/models/auth/Auth.model";
import type { User } from "~/models/auth/User";

export const useAuth = defineStore("auth", {

    // STATE
    state: (): Auth => ({
        user:     null,
        logged:   false,
    }),

    // GETTERS
    getters: {
        userData(): Auth["user"] | null {
            return this.user;
        },
        isLogged(): boolean {
            return this.logged;
        },
    },

    // ACTIONS
    actions:{

        // LOGIN
        async login(email: string, password: string, redirect?: string): Promise<void> {

            // Comprobamos si ya estamos logueados
            if(this.isLogged && this.user) {
                console.warn("Ya estás logueado");
                return;
            }

            // Servicios
            const router = useRouter(),
                  directus = useNuxtApp().$directus;

            // Probamos a loguearnos
            try {

                // Probamos a loguearnos
                await directus.login(email, password);
                
                await this.getUserData();

                // Si tenemos una redirección, llamamos a la función de redirección
                if(redirect) {
                    router.push(redirect);
                }

            } catch (error) {
                console.error(error);
                alert("Error al iniciar sesión");
            }


        },

        // LOGOUT
        async logout(): Promise<void> {

            // Validaciones
            if(!this.logged) {
                console.warn("No estás logueado");
            }

             // Servicios
            const router   = useRouter(),
                  directus = useNuxtApp().$directus,
                  cookie   = useCookie('auth');


            // Probamos a cerrar sesión
            try {

                // Cerramos sesión
                await directus.logout()

                // Actualizamos las propiedades de State
                await this.reset();

                // Borramos la cookie
                cookie.value = null;

                // Redirigimos al inicio
                router.push('/');                

            } catch (error) {
                console.error(error);
                alert("Error al cerrar sesión");
            }

        },

        // REGISTER
        async register(user: Auth["user"]): Promise<void> {},

        // UPDATE USER
        async updateUser(user: Auth["user"]): Promise<void> {},

        // GET CURRENT USER
        async getUserData(): Promise<void> {

             // Servicios
             const directus = useNuxtApp().$directus;


            // Probamos a obtener los datos del usuario
            try { 
                
                // Obtenemos los datos del usuario
                await directus.request<User>(readMe()).then((response:User)=> {
                    this.user = response;
                    this.logged = true;
                });
                
            
            } catch (error) {
                this.reset();
                console.error(error);
                throw new Error("Error al obtener los datos del usuario");
            }

        },

        // RESET
        async reset(): Promise<void> {
            this.$reset();
        },

    }
})