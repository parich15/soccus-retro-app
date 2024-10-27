import { defineStore } from "pinia";
import type { Auth } from "~/models/auth/Auth.model";

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
        async login(email: string, password: string): Promise<void> {},

        // LOGOUT
        async logout(): Promise<void> {},

        // REGISTER
        async register(user: Auth["user"]): Promise<void> {},

        // UPDATE USER
        async updateUser(user: Auth["user"]): Promise<void> {},

        // GET CURRENT USER
        async getUserData(): Promise<void> {},

        // RESET
        async reset(): Promise<void> {
            this.$reset();
        },

    }
})