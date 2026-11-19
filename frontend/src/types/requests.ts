export type Priority = "LOW" | "MEDIUM" | "HIGH";
export type RequestStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED";

export type ServiceRequest = {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: Priority;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
};
