import { create } from "zustand";
import { useShallow } from 'zustand/react/shallow'

const useNotificationStore = create((set, get) => (
  {
    message: null,
    level: null,
    actions: {
      setInfo: (message, timeout=5) => {
        set(() => ({ message, level: "info"}))
        setTimeout(() => get().actions.clear(), timeout * 1000)
      },
      clear: () => set(() => ({ message: null, level: null }))
    }
  }
))

export const useNotification = () => useNotificationStore(useShallow(state => ({message: state.message, level: state.level})))
export const useNotificationActions = () => useNotificationStore(state => state.actions)
