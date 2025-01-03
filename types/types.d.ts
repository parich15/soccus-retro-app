// IMPORTAMOS LOS CLIENTES NECESARIOS DE DIRECTUS

import type { Directus } from "./Directus";

// DEFINIMOS LAS INTERFACES GLOBALMENTE
declare module '#app' {
    interface NuxtApp {
        $directus: Directus
    }
}