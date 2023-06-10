import { API, Countries } from "../config/api";

export async function addTrip(data) {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await API.post("trip", data, config);
    if (response) {
      return response.data.data;
    }
  } catch (error) {
    throw new Error("Failed to posted data trip ");
  }
}

export async function addcountry() {
  try {
    const response = await Countries.get("all");
    if (response) {
      return response?.data;
    }
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export async function transactionList() {
  try {
    const response = await API.get("transactions");

    return response.data.data;
  } catch (error) {
    throw new Error("Failed get list transactions");
  }
}
