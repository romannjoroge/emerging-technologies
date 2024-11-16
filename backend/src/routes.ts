import { BASE_HOST, PasswordType, InitType } from "./types";
import axios from "axios";
export async function createPassword(password: PasswordType) {
    try {
        return await axios.post(`${BASE_HOST}/add`, password);
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}
export async function updatePassword(password: PasswordType) {
    try {
        return await axios.put(`${BASE_HOST}/update`, password);
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}
export async function deletePassword(id: string) {
    try {
        return await axios.delete(`${BASE_HOST}/delete/${id}`);
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}
export async function getPassword(service: string) {
    try {
        return await axios.get(`${BASE_HOST}/get/${service}`);
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}
export async function getPasswords() {
    try {
        return await axios.get(`${BASE_HOST}/get`);
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}
export async function initializePasswords(init: InitType) {
    return await axios.post(`${BASE_HOST}/initialize`, init);
}