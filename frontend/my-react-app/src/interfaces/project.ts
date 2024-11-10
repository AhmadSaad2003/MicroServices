import { ReactNode } from "react";

export interface Project {
  id: number;
  title: string;
  content: string;
  createdAt: ReactNode;
  creationDate: ReactNode;
  updatedAt: ReactNode;
  userId: number;
}
