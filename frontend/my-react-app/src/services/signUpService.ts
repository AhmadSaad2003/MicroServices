import axios from "axios";
import { AUTH_ROUTES } from "../routes/routes";

export const signUp = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const response = await axios.post(AUTH_ROUTES.SIGNUP, {
      email,
      password,
      username,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "An error occurred during sign up."
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
