import axios from "axios";
import { DOC_ROUTES } from "../routes/routes";
import { Project } from "../interfaces/project";

export const getAll = async () => {
  try {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get<Project[]>(DOC_ROUTES.SELECTALL, {
      headers,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const getProjectById = async (documentId: number): Promise<Project> => {
  try {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const url = DOC_ROUTES.GETSINGLEDOCUMENT.replace(
      ":documentId",
      documentId.toString()
    );
    const response = await axios.get<{ project: Project }>(url, { headers });
    return response.data.document;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
