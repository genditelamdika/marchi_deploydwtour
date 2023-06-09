import { API } from "../config/api";

export async function User() {
  try {
    const response = await API.get("user");
    if (response) {
      return response.data.data;
    }
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}
