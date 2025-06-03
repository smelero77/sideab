import { writable } from 'svelte/store';
import { nanoid } from 'nanoid';

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

const createNotificationStore = () => {
  const { subscribe, update } = writable<ToastNotification[]>([]);

  function addToast(
    message: string,
    type: ToastNotification['type'] = 'info',
    duration: number = 3000
  ) {
    const id = nanoid();
    update((all) => [{ id, message, type, duration }, ...all]); // Añade al principio para que las nuevas aparezcan arriba
    if (duration) {
      setTimeout(() => removeToast(id), duration);
    }
    return id;
  }

  function removeToast(id: string) {
    update((all) => all.filter((toast) => toast.id !== id));
  }

  return {
    subscribe,
    addToast,
    removeToast,
  };
};

export const notifications = createNotificationStore();

// Funciones helper para tipos comunes
export const toastSuccess = (message: string, duration?: number) => notifications.addToast(message, 'success', duration);
export const toastError = (message: string, duration?: number) => notifications.addToast(message, 'error', duration);
export const toastInfo = (message: string, duration?: number) => notifications.addToast(message, 'info', duration);
export const toastWarning = (message: string, duration?: number) => notifications.addToast(message, 'warning', duration); 