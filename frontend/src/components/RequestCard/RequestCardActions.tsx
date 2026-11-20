import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Info, Trash } from "lucide-react";
import styles from "./RequestCardActions.module.css";
import type { RequestStatus } from "../../types/requests";
import { attRequestStatus } from "../../api/attRequestStatus";
import { useRequests } from "../../contexts/requestsContext";
import { deleteRequest } from "../../api/deleteRequest";
import EditRequestForm from "../Forms/EditRequestForm";

const statusLabels: Record<RequestStatus, string> = {
  OPEN: "EM ABERTO",
  IN_PROGRESS: "EM ANDAMENTO",
  COMPLETED: "CONCLUÍDO",
};

const statusStyles: Record<RequestStatus, string> = {
  OPEN: styles["statusButton-open"],
  IN_PROGRESS: styles["statusButton-progress"],
  COMPLETED: styles["statusButton-concluded"],
};

type Props = {
  id: number;
  status: RequestStatus;
};

function getNextStatus(status: RequestStatus): RequestStatus | null {
  switch (status) {
    case "OPEN":
      return "IN_PROGRESS";

    case "IN_PROGRESS":
      return "COMPLETED";

    case "COMPLETED":
      return null;
  }
}

const BottomActions = ({ id, status }: Props) => {
  const { setRequests } = useRequests();
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = infoOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [infoOpen]);

  function handleStatusChange() {
    const nextStatus = getNextStatus(status);

    if (!nextStatus) return;

    attRequestStatus({ id, nextStatus });

    setRequests((previousRequests) =>
      previousRequests.map((request) =>
        request.id === id ? { ...request, status: nextStatus } : request,
      ),
    );
  }

  const handleDeleteRequest = async () => {
    try {
      deleteRequest(id);

      setRequests((previousRequests) =>
        previousRequests.filter((request) => request.id !== id),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.actions}>
      <button
        className={`${styles.statusButton} ${statusStyles[status]}`}
        type="button"
        onClick={handleStatusChange}
      >
        {statusLabels[status]}
      </button>

      <button
        className={`${styles.active} ${statusStyles[status]}`}
        type="button"
        aria-label="Ver detalhes da solicitação"
        onClick={() => setInfoOpen(true)}
      >
        <Info size={24} strokeWidth={1.6} />
      </button>

      <button
        className={`${styles.active} ${statusStyles[status]}`}
        type="button"
        aria-label="Excluir solicitação"
        onClick={handleDeleteRequest}
      >
        <Trash size={24} strokeWidth={1.6} />
      </button>

      {infoOpen &&
        createPortal(
          <EditRequestForm id={id} onClose={() => setInfoOpen(false)} />,
          document.body,
        )}
    </div>
  );
};

export default BottomActions;
