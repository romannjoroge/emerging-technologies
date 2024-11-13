export interface PasswordData {
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
    // do some other stuff
    console.error(error);
    throw new Error("error: unable to get your passwords");
  }
}
async function PostPasswordData(passwordData: PasswordData) {
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
export { GetPasswordData, PostPasswordData };
