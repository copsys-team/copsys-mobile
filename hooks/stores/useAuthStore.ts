import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SecureStorage } from "@/utils/secureStorage";
import { AuthTokens, User } from "@/types/core";

// Zustand Store with Persist Middleware
export type AuthState = {
  email: string | null;
  password: string | null;
  organization: any ;
  user: any;
  token: any;
  loggedIn: boolean;
  logger:(email: string | null, password:string | null) => void;
  login: (user: any, token: any) => void;
  logout: () => void;
  setorganization: (organization: String) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      organization:'Select Organization',
      email: null,
      password: null,
      user: null,
      token: null,
      loggedIn: false,
      // Login function
      login: (user, token) => 
        set({ user, token, loggedIn: user && !!token }),

      // Logout function
      logout: () => set({ user: null, token: null, loggedIn: false,organization:'Select Organization' }),
      setorganization: (organization) => set({organization}),
      logger: (email,password) => set({email,password})
    }),
    {
      name: "auth-storage", // Storage key
      storage: createJSONStorage(() => SecureStorage), // Use SecureStore
    }
  )
);
