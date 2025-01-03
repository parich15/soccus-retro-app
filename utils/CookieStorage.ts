import type { CookieRef } from "#app";
import type { AuthenticationData, AuthenticationStorage } from "@directus/sdk";

// AUTHENTICATION STORAGE
export class CookieStorage implements AuthenticationStorage {
    
    constructor(private nuxtApp: any) {}

    cookieKey: string = 'auth';

    get(): AuthenticationData | null {
        const cookie = this.nuxtApp.runWithContext(() => useCookie(this.cookieKey)) as CookieRef<string | null>;
        if(!cookie.value) return null;
        return JSON.parse(JSON.stringify(cookie.value)) as AuthenticationData;
    }

    set(data: AuthenticationData | null): void {
        const cookie = this.nuxtApp.runWithContext(() => useCookie(this.cookieKey)) as CookieRef<string | null>;
        cookie.value = JSON.stringify(data);
    }

    remove(): void {
        const cookie = this.nuxtApp.runWithContext(() => useCookie(this.cookieKey)) as CookieRef<string | null>;
        cookie.value = null;
    }
    
}