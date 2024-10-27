import type { User } from "./User";

export interface Auth {
    user:     User | null;
    logged:   boolean;
}