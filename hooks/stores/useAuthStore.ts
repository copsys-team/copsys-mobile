import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SecureStorage } from "@/utils/secureStorage";
import { AuthTokens, User } from "@/types/core";

// Zustand Store with Persist Middleware
export type AuthState = {
  organization: any ;
  user: Object | null;
  token: Object | null;
  loggedIn: boolean;
  login: (user: Object, token: Object) => void;
  logout: () => void;
  setorganization: (organization: String) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      organization:'Select Organization',
      user: null,
      token: null,
      loggedIn: false,
      // Login function
      login: (user, token) => 
        set({ user, token, loggedIn: user && !!token }),

      // Logout function
      logout: () => set({ user: null, token: null, loggedIn: false,organization:'Select Organization' }),
      setorganization: (organization) => set({organization}),
    }),
    {
      name: "auth-storage", // Storage key
      storage: createJSONStorage(() => SecureStorage), // Use SecureStore
    }
  )
);
