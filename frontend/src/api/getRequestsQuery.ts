import type { ServiceRequest } from "../types/requests";

const API_URL = import.meta.env.VITE_API_URL;

export const getRequestsQuery = async (filters: {
  priority?: string;
  status?: string;
  order?: string;
}): Promise<ServiceRequest[]> => {
  const params = new URLSearchParams();

  if (filters.priority) params.set("priority", filters.priority);
  if (filters.status) params.set("status", filters.status);
  if (filters.order) params.set("order", filters.order);

  const res = await fetch(`${API_URL}/request?${params}`);

  if (!res.ok) {
    throw new Error("Não foi possível carregar as solicitações.");
  }

  return res.json();
};
