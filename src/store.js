import { browser } from '$app/environment';
import { writable } from 'svelte/store';

/**
 * @typedef { import('$lib/backend/models').UserData } UserData
 * @typedef { import('$lib/components/Hand').Hand } Hand
 */

/** @type {UserData} */
const defaultUser = { _id: 'initial_id', name: '', wins: -1 };
/** @type {UserData} */
export const initialUser = browser ? JSON.parse(window.localStorage.getItem('user')) ?? defaultUser : defaultUser;

/** @type {Array.<Hand>} */
export const initialHands = [];

export const currUser = writable(initialUser);

currUser.subscribe((value) => {
  if (browser) {
    let storedUser = window.localStorage.getItem('user');
    if (value != JSON.parse(storedUser)) {
      window.localStorage.setItem('user', JSON.stringify(value));
    }
  }
});

export const currLobby = writable([initialUser]);
export const currHands = writable(initialHands);
export const tableId = writable('');
