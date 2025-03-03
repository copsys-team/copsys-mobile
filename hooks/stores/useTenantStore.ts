import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SecureStorage } from "@/utils/secureStorage";
import { Tenant } from "@/types/core";

// Zustand Store with Persist Middleware
export type TenantState = {
  tenants: Record<string, Tenant>;
  currentTenantId: string | null;
  setCurrentTenantId: (id: string) => void;
};

export const useTenantStore = create<TenantState>()(
  persist(
    (set) => ({
      tenants: {},
      currentTenantId: null,
      // set current tenant id function
      setCurrentTenantId: (currentTenantId) => set({ currentTenantId }),
    }),
    {
      name: "tenant-storage", // Storage key
      storage: createJSONStorage(() => SecureStorage), // Use SecureStore
    }
  )
);
