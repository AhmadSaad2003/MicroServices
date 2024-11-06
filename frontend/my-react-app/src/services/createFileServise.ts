import axios from "axios";
import { DOC_ROUTES } from "../routes/routes";

export const createFirst = async (title: string, content: string) => {
  try {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(
      DOC_ROUTES.CREATE,
      {
        title,
        content,
      },
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
