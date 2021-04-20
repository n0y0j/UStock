import { atom } from 'recoil';

export const nameState = atom({
    key: 'nameState',
    default: window.localStorage.getItem("nickname"),
})

export const IDState = atom({
    key: 'idState',
    default: window.localStorage.getItem("id"),
})

