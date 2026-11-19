import styles from "./RequestCard.module.css";
import BottomActions from "./RequestCardActions";
import Priority from "./RequestCardHeader";
import type { ServiceRequest } from "../../types/requests";

function RequestCard({
  id,
  title,
  description,
  createdAt,
  updatedAt,
  priority,
  category,
  status,
}: ServiceRequest) {
  function formatDate(date: string): string {
    return new Date(date).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <article className={styles.card}>
      <Priority priority={priority} category={category} />
      <div className={styles.content}>
        <h2>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.dates}>
        <li>CRIADO EM {formatDate(createdAt)}</li>
        {updatedAt !== createdAt && (
          <li>ATUALIZADO EM {formatDate(updatedAt)}</li>
        )}
      </div>
      <BottomActions id={id} status={status} />
    </article>
  );
}

export default RequestCard;
