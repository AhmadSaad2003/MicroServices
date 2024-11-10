import axios from "axios";
import { DOC_ROUTES } from "../routes/routes";
import { Version } from "../interfaces/version";

export const getAllVersions = async (
  documentId: number
): Promise<Version[]> => {
  try {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const url = DOC_ROUTES.SELECTVERSIONS.replace(
      ":documentId",
      documentId.toString()
    );

    const response = await axios.get<{ versions: Version[] }>(url, { headers });
    console.log("Received versions data:", response.data);

    if (Array.isArray(response.data)) {
      return response.data;
    }

    if (response.data && Array.isArray(response.data.versions)) {
      return response.data.versions;
    }

    throw new Error("Unexpected response format");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
