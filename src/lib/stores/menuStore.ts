import { writable } from 'svelte/store';

// Creamos el store con un valor inicial
const createMenuStore = () => {
    const { subscribe, set, update } = writable(false);

    return {
        subscribe,
        open: () => {
            console.log('Abriendo menú...');
            set(true);
            console.log('Estado después de abrir:', true);
        },
        close: () => {
            console.log('Cerrando menú...');
            set(false);
            console.log('Estado después de cerrar:', false);
        },
        toggle: () => {
            console.log('Alternando menú...');
            update(value => {
                const newValue = !value;
                console.log('Estado actual:', value, 'Nuevo estado:', newValue);
                return newValue;
            });
        }
    };
};

export const menu = createMenuStore(); 