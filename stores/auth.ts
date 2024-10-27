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
        userData(): Auth["user"] {
            return this.user;
        },
        isLogged(): Auth["logged"] {
            return this.isLogged;
        },
    },

    // ACTIONS
    actions:{

        // LOGIN
        async login(email: string, password: string, redirect?: string): Promise<void> {

            // Comprobamos si ya estamos logueados
            if(this.logged && this.user) {
                throw new Error("Ya estás logueado");
            }

            // Importamos las funciones necesarias
            const router = useRouter();
            const { $directus } = useNuxtApp() as any;

            // Probamos a loguearnos
            try {
                
                // Probamos a loguearnos
                const login = await $directus.auth.login({
                    email,
                    password,
                })

                // Si el login es correcto, obtenemos los datos del usuario
                await this.getUserData();

                // Si tenemos una redirección, llamamos a la función de redirección
                if(redirect) {
                    router.push(redirect);
                }


            } catch (error) {
                console.error(error);
                throw new Error("Error al iniciar sesión");
            }


        },

        // LOGOUT
        async logout(): Promise<void> {

            // Validaciones
            if(!this.logged) {
                throw new Error("No estás logueado");
            }

            // Importamos las funciones necesarias
            const router = useRouter();
            const { $directus } = useNuxtApp() as any;

            // Probamos a cerrar sesión
            try {
                
                // Cerramos sesión
                const logout = await $directus.auth.logout();

                // Borramos cookie residual
                const authExpiration = useCookie('auth_expires_at');
                authExpiration.value = null;

                // Actualizamos las propiedades de State
                this.reset();

                // Redirigimos al inicio
                router.push('/');

            } catch (error) {
                console.error(error);
                throw new Error("Error al cerrar sesión");
            }

        },

        // REGISTER
        async register(user: Auth["user"]): Promise<void> {},

        // UPDATE USER
        async updateUser(user: Auth["user"]): Promise<void> {},

        // GET CURRENT USER
        async getUserData(): Promise<void> {
            
            // Importamos las funciones necesarias
            const { $directus } = useNuxtApp() as any;
            
            // Probamos a obtener los datos del usuario
            try {
                
                // Obtenemos los datos del usuario
                const user: User = await $directus.users.me.read({
                    fields: ['*'],
                });
                
                // Si la petición es correcta, actualizamos los datos del usuario
                this.user   = user;
                this.logged = true;

            } catch (error) {
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