import { API } from "../config/api";

export async function getTrip() {
    try {
      const response = await API.get('trip');
      if(response) {
  
        return response.data?.data;
      }
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  }

export async function getTripId(id) {
    try {
        const response = await API.get(`trip/${id}` )
        if(response) {
  
            return response.data?.data;
          }
        } catch (error) {
          throw new Error('Failed to fetch data');
    }
}