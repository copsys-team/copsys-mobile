import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SecureStorage } from "@/utils/secureStorage";
import { AuthTokens, User } from "@/types/core";

// Zustand Store with Persist Middleware
export type AuthState = {
  organization: String ;
  user: User | null;
  tokens: AuthTokens | null;
  loggedIn: boolean;
  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
  setorganization: (organization: String) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      organization:'Select Organization',
      user: null,
      tokens: null,
      loggedIn: false,
      // Login function
      login: (user, tokens) =>
        set({ user, tokens, loggedIn: user && !!tokens }),

      // Logout function
      logout: () => set({ user: null, tokens: null, loggedIn: false,organization:'Select Organization' }),
      setorganization: (organization) => set({organization}),
    }),
    {
      name: "auth-storage", // Storage key
      storage: createJSONStorage(() => SecureStorage), // Use SecureStore
    }
  )
);
