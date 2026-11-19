import type { ServiceRequest } from "../types/requests";

const API_URL = import.meta.env.VITE_API_URL;

export const getRequests = async (): Promise<ServiceRequest[]> => {
  const res = await fetch(`${API_URL}/request`);

  if (!res.ok) {
    throw new Error("Não foi possível carregar as solicitações.");
  }

  return res.json();
};
