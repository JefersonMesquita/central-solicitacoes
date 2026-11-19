const API_URL = import.meta.env.VITE_API_URL;

export const deleteRequest = async (id: number) => {
  let response;

  try {
    response = await fetch(`${API_URL}/request/${id}`, {
      method: "DELETE",
    });
  } catch {
    throw new Error("Não foi possível conectar à API.");
  }

  if (!response.ok) {
    throw new Error("Não foi possível excluir a solicitação.");
  }
};
