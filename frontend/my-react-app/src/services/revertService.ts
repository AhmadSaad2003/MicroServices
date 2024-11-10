import axios from "axios";
import { DOC_ROUTES } from "../routes/routes";
import { Version } from "../interfaces/version";
import { Project } from "../interfaces/project";

export const revertVersion = async (documentId:number, versionId: number) => {
    try {
      const token = localStorage.getItem("token");
  
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      const response = await axios.post(
        DOC_ROUTES.REVERTVERSION,
        {
            documentId,
            versionId,
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
