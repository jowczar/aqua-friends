import "express";

export type Role = "user" | "admin";
export type Claims = {
  role: Role;
};

/**
 * User data from Firebase Auth
 */
export type User = {
  uid: string;
  role: Role;
  email?: string;
};

/**
 * User data stored in firestore as users/{uid}
 */
export type UserDetails = {
  id: string;
  username: string;
  email: string;
  admin: boolean;
  avatar: string;
  fav_aquariums?: string[];
  friends?: string[];
};

declare module "express" {
  export interface Request {
    user?: User;
  }
}
