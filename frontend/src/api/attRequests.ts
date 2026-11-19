// frontend/src/api/requests.ts
import type { RequestStatus, ServiceRequest } from "../types/requests";

const API_URL = import.meta.env.VITE_API_URL;

export const updateRequestStatus = async (
  id: number,
  status: RequestStatus,
): Promise<ServiceRequest> => {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/request/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  } catch {
    throw new Error("Não foi possível conectar à API.");
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      body?.error?.message ?? "Não foi possível atualizar o status.",
    );
  }

  return body;
};
