import type { ServiceRequest } from "../types/requests";

const API_URL = import.meta.env.VITE_API_URL;

type RequestData = {
  title: string;
  description: string;
  category: string;
  priority: string;
};

export const createRequest = async (
  data: RequestData,
): Promise<ServiceRequest> => {
  let response;

  try {
    response = await fetch(`${API_URL}/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error("Não foi possível conectar à API.");
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null);

    throw new Error(
      body?.error?.message ?? "Não foi possível criar a solicitação.",
    );
  }

  return response.json();
};
