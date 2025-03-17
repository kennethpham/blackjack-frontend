import { writable } from 'svelte/store';

/**
 * @typedef { import('$lib/backend/models').UserData } UserData
 * @typedef { import('$lib/components/Hand').Hand } Hand
 */

/** @type {UserData} */
export const initialUser = { _id: 'initial_id', name: '', wins: -1 };

/** @type {Array.<Hand>} */
export const initialHands = [];

export const currUser = writable(initialUser);
export const currLobby = writable([initialUser]);
export const currHands = writable(initialHands);
export const tableId = writable('');
