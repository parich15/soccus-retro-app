import type { AuthenticationClient, DirectusClient, RestClient } from "@directus/sdk";

export type Directus = DirectusClient<any> & RestClient<any> & AuthenticationClient<any>;