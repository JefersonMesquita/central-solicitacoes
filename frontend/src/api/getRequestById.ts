import type { ServiceRequest } from "../types/requests";

const API_URL = import.meta.env.VITE_API_URL;

export const getRequestById = async (id: number): Promise<ServiceRequest> => {
  const res = await fetch(`${API_URL}/request/${id}`);

  if (!res.ok) {
    throw new Error("Não foi possível carregar a solicitação.");
  }

  return res.json();
};
