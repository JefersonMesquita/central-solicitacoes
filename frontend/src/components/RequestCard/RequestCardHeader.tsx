import styles from "./RequestCardHeader.module.css";
import type { Priority } from "../../types/requests";

type Props = {
  priority: Priority;
  category: string;
};

const priorityLabels: Record<Priority, string> = {
  LOW: "BAIXA PRIORIDADE",
  MEDIUM: "MÉDIA PRIORIDADE",
  HIGH: "ALTA PRIORIDADE",
};

const priorityStyles: Record<Priority, string> = {
  LOW: styles["badge-green"],
  MEDIUM: styles["badge-yellow"],
  HIGH: styles["badge-red"],
};

export function PriorityCategoy({ priority, category }: Props) {
  return (
    <div className={styles.header}>
      <span className={priorityStyles[priority]}>
        {priorityLabels[priority]}
      </span>
      <div className={styles.category}>
        <span className={styles.label}>Categoria:</span>
        <span className={styles.value}>{category}</span>
      </div>
    </div>
  );
}

export default PriorityCategoy;
