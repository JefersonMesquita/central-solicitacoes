const API_URL = import.meta.env.VITE_API_URL;
import type { RequestStatus } from "../types/requests";

type Props = {
  id: number;
  nextStatus: RequestStatus;
};

export const attRequestStatus = async ({ id, nextStatus }: Props) => {
  let response;

  try {
    response = await fetch(`${API_URL}/request/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
  } catch {
    throw new Error("Não foi possível conectar à API.");
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null);

    throw new Error(
      body?.error?.message ?? "Não foi possível atualizar a solicitação.",
    );
  }
  return response;
};
