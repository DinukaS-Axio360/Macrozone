import { User } from "../types/user";
import { axiosClient } from "./axiosClient";

export const jsonPlaceholderApi = {
  getUsers: async (): Promise<User[]> => {
    const response = await axiosClient.get<User[]>(
      "https://jsonplaceholder.typicode.com/users",
    );
    return response.data;
  },
};
