import { useEffect, useState } from "react";
import { getRequests } from "./api/getRequests";
import { useRequests } from "./contexts/requestsContext";

import Header from "./components/Header/AppHeader";
import RequestCard from "./components/RequestCard/RequestCard";
import AddRequest from "./components/Forms/AddRequest";

import "./App.css";

export default function App() {
  const { requests, setRequests } = useRequests();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRequests = async () => {
      try {
        setRequests(await getRequests());
        setError("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro inesperado.");
      } finally {
        setLoading(false);
      }
    };

    console.log("rodando");
    loadRequests();
  }, [setRequests]);

  return (
    <>
      <Header />

      <div className="container">
        {loading && <p>Carregando...</p>}

        {error && <p role="alert">{error}</p>}

        {!loading && !error && requests.length === 0 && (
          <p id="zeroRequests">Nenhuma solicitação encontrada...</p>
        )}

        {requests.map((request) => (
          <RequestCard
            key={request.id}
            id={request.id}
            title={request.title}
            description={request.description}
            category={request.category}
            priority={request.priority}
            status={request.status}
            createdAt={request.createdAt}
            updatedAt={request.updatedAt}
          />
        ))}
      </div>

      <AddRequest />
    </>
  );
}
