import "express";

export type Role = "user" | "admin";
export type Claims = {
    role: Role;
}

export type User = {
    uid: string;
    role: Role;
    email?: string;
}

declare module "express" {
    export interface Request {
        user?: User;
    }
}
