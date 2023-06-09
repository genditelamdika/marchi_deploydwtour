import { API } from "../config/api";

export async function transaction(data) {
  try {
    const transaction = await API.post("transaction", data);
    console.log("Post Success", transaction);
    if (transaction) {
      return transaction?.data;
    }
  } catch (error) {
    throw new error("transaction error");
  }
}
