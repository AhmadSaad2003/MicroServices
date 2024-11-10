import axios from "axios";
import { DOC_ROUTES } from "../routes/routes";
import { Version } from "../interfaces/version";
import { Project } from "../interfaces/project";

export const saveEditing = async (documentId:number, content: string) => {
    try {
      const token = localStorage.getItem("token");
  
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const url = DOC_ROUTES.SAVEEDITING.replace(":documentId", documentId.toString());
      console.log(url);
      const response = await axios.put(
        url,
        {
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
