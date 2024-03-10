import { writable } from 'svelte/store';

/**
 * @typedef { import('$lib/backend/models').UserData } UserData
 */

/** @type {UserData} */
export const initialUser = { _id: 'initial_id', name: '', wins: -1 };

export const currUser = writable(initialUser);
