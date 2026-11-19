import { FilterIcon } from "lucide-react";
import type { FormEvent } from "react";
import styles from "./FilterSelect.module.css";
import { useFilters } from "../../contexts/filtersContext";

const Filter = () => {
  const { setFilters } = useFilters();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setFilters((prev) => ({
      ...prev,
      order: (formData.get("order")?.toString() ?? "desc") as "asc" | "desc",
      priority: formData.get("priority")?.toString() ?? "",
      status: formData.get("status")?.toString() ?? "",
    }));
  };

  return (
    <div className={styles.container}>
      <button className={styles.filter}>Filtros</button>
      <button className={styles.filterIcon}>
        <FilterIcon size={24} strokeWidth={2} color="black" />
      </button>
      <form onSubmit={handleSubmit} className={styles.forms}>
        <div className={styles.division}>
          Ordenação:
          <label>
            <input type="radio" name="order" value="desc" defaultChecked />
            <span className={styles.options}>Mais recentes</span>
          </label>
          <label>
            <input type="radio" name="order" value="asc" />
            <span className={styles.options}>Mais antigas</span>
          </label>
        </div>
        <div className={styles.division}>
          Prioridade:
          <label>
            <input type="radio" name="priority" value="" defaultChecked />
            <span className={styles.options}>Todos</span>
          </label>
          <label>
            <input type="radio" name="priority" value="LOW" />
            <span className={styles.options}>Baixa</span>
          </label>
          <label>
            <input type="radio" name="priority" value="MEDIUM" />
            <span className={styles.options}>Média</span>
          </label>
          <label>
            <input type="radio" name="priority" value="HIGH" />
            <span className={styles.options}>Alta</span>
          </label>
        </div>
        <div className={styles.division}>
          Status de produção:
          <label>
            <input type="radio" name="status" value="" defaultChecked />
            <span className={styles.options}>Todos</span>
          </label>
          <label>
            <input type="radio" name="status" value="OPEN" />
            <span className={styles.options}>Aberto</span>
          </label>
          <label>
            <input type="radio" name="status" value="IN_PROGRESS" />
            <span className={styles.options}>Em andamento</span>
          </label>
          <label>
            <input type="radio" name="status" value="COMPLETED" />
            <span className={styles.options}>Concluído</span>
          </label>
        </div>
        <button type="submit" className={styles.filterButton}>
          Filtrar
        </button>
      </form>
    </div>
  );
};

export default Filter;
