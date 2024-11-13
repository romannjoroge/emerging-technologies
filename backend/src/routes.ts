import { Password, BASE_HOST, passwordschema, PasswordType } from "./types";
import axios from "axios";
export function createPassword(password: PasswordType) {
    try {
        return axios.post(`${BASE_HOST}/add`, password);
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}
export function updatePassword(password: PasswordType) {
    try {
        return axios.put(`${BASE_HOST}/update`, password);
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}
export function deletePassword(id: string) {
    try {
        return axios.delete(`${BASE_HOST}/delete/${id}`);
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}
export function getPassword(service: string) {
    try {
        return axios.get(`${BASE_HOST}/get/${service}`);
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}