import { passwordEntrySchema } from "@/schema/zod";
import z from "zod";
export interface PasswordData {
  id: number;
  password: string;
  service: string;
  email?: string;
  username?: string;
  note?: string;
}
export const BASE_URL = "http://localhost:5000";
async function GetPasswordData(): Promise<PasswordData[]> {
  try {
    const response = await fetch(`${BASE_URL}/get`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("error: unable to get your passwords");
  }
}
async function PostPasswordData(
  passwordData: z.infer<typeof passwordEntrySchema>,
) {
  try {
    const response = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passwordData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("unable to save the password");
  }
}
async function DeletePasswordEntry(id: number) {
  try {
    await fetch(`${BASE_URL}/delete/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
    throw new Error("unable to delete the password entry");
  }
}
async function UpdatePasswordEntry(
  passwordData: z.infer<typeof passwordEntrySchema>,
) {
  try {
    await fetch(`${BASE_URL}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passwordData),
    });
  } catch (error) {
    console.error(error);
    throw new Error("unable to update the password");
  }
}
export {
  GetPasswordData,
  PostPasswordData,
  DeletePasswordEntry,
  UpdatePasswordEntry,
};
