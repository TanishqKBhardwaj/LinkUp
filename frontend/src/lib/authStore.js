import { create } from "zustand";
import { persist } from "zustand/middleware";

 export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      theme:"forest",
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      setTheme:(newTheme)=>set({theme:newTheme})
    }),
    {
      name: "user-storage", // unique name for storage
      getStorage: () => localStorage, // default is localStorage
    }
  )
);


