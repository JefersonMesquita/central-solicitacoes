import { X } from "lucide-react";
import styles from "./CreateRequestForm.module.css";
import { useState, type FormEvent } from "react";
import { createRequest } from "../../api/createRequest";
import { useRequests } from "../../contexts/requestsContext";

type Props = {
  onClose: () => void;
};

const RegisterRequest = ({ onClose }: Props) => {
  const { setRequests } = useRequests();

  const [titleForm, setTitleForm] = useState("");
  const [descriptionForm, setDescriptionForm] = useState("");
  const [priorityForm, setPriorityForm] = useState("");
  const [categoryForm, setCategoryForm] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await createRequest({
        title: titleForm,
        description: descriptionForm,
        category: categoryForm,
        priority: priorityForm,
      });

      setRequests((previousRequests) => [response, ...previousRequests]);

      onClose();
    } catch (error) {
      console.error("Erro ao criar solicitação:", error);
    }
  };

  return (
    <div
      className={styles.containerColor}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          <button type="button" className={styles.closeForm} onClick={onClose}>
            <X size={24} strokeWidth={2} />
          </button>

          <span className={styles.msg}>Criar Solicitação</span>

          <input
            required
            className={`${styles.title} ${styles.disable}`}
            type="text"
            placeholder="Título da solicitação..."
            value={titleForm}
            onChange={(event) => setTitleForm(event.target.value)}
          />

          <div className={styles.containerPriotityCategory}>
            <input
              required
              className={`${styles.category} ${styles.disable}`}
              type="text"
              placeholder="Categoria..."
              value={categoryForm}
              onChange={(event) => setCategoryForm(event.target.value)}
            />

            <select
              required
              className={`${styles.priority} ${styles.disable}`}
              name="priority"
              id="priority"
              value={priorityForm}
              onChange={(event) => setPriorityForm(event.target.value)}
            >
              <option value="" disabled>
                Prioridade...
              </option>
              <option value="LOW">Baixa</option>
              <option value="MEDIUM">Média</option>
              <option value="HIGH">Alta</option>
            </select>
          </div>

          <textarea
            required
            className={`${styles.description} ${styles.disable}`}
            name="description"
            placeholder="Descrição..."
            value={descriptionForm}
            onChange={(event) => setDescriptionForm(event.target.value)}
          />

          <button className={styles.send} type="submit">
            Criar solicitação
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterRequest;
