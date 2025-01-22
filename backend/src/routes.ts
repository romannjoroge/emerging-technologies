import { BASE_HOST, PasswordType, InitType } from "./types";
import * as crypto from "node:crypto";
import axios from "axios";
export async function createPassword(password: PasswordType) {
  try {
    return await axios.post(`${BASE_HOST}/add`, password);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
export async function updatePassword(password: PasswordType, id: string) {
  try {
    return await axios.patch(`${BASE_HOST}/update/${id}`, password);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
export async function deletePassword(id: string) {
  try {
    return await axios.delete(`${BASE_HOST}/delete/${id}`);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
export async function getPassword(service: string) {
  try {
    return await axios.get(`${BASE_HOST}/get/${service}`);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
export async function getPasswords() {
  try {
    return await axios.get(`${BASE_HOST}/get`);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
export async function initializePasswords() {
  const init: InitType = {
    clientName: crypto.randomBytes(20).toString("hex"),
    clock: {},
    neighbours: [],
  };
  console.log("Ran initializePasswords");
  return await axios.post(`${BASE_HOST}/initialize`, init);
}

export async function pair(name: string, address: string, url: string) {
  try {
    // Get all passwords
    const resp = await getPasswords();
    // Send data to middleware
    await axios.post(`${url}/pair`, {
      neighbour: {name, address},
      passwords: resp.data
    })
  } catch(err) {
    console.log("Error Pairing", err);
    throw new Error("Error Pairing");
  }
}