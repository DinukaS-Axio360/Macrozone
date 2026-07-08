import { User } from "../types/user";
import { axiosClient } from "./axiosClient";

export const jsonPlaceholderApi = {
  // Returns a Promise that resolves to an array of User objects.
  // <User[]> tells TypeScript what the response data looks like.
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await axiosClient.get<User[]>(
        "https://jsonplaceholder.typicode.com/users",
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
