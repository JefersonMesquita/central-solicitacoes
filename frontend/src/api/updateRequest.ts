import type { ServiceRequest, Priority } from "../types/requests";

const API_URL = import.meta.env.VITE_API_URL;

type att = {
  id: number;
  data: {
    title: string;
    description: string;
    category: string;
    priority: Priority;
  };
};

export const updateRequest = async ({
  id,
  data,
}: att): Promise<ServiceRequest> => {
  let response;

  try {
    response = await fetch(`${API_URL}/request/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error("Não foi possível conectar à API.");
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null);

    throw new Error(
      body?.error?.message ?? "Não foi possível editar a solicitação.",
    );
  }

  return response.json();
};
