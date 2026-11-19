import { useEffect, useState } from "react";
import { X } from "lucide-react";
import styles from "./EditRequestForm.module.css";
import { getRequestById } from "../../api/getRequestById";
import { updateRequest } from "../../api/updateRequest";
import type { Priority } from "../../types/requests";
import { useRequests } from "../../contexts/requestsContext";

interface Props {
  id: number;
  onClose: () => void;
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const EditRequestForm = ({ id, onClose }: Props) => {
  const [titleForm, setTitleForm] = useState("");
  const [categoryForm, setCategoryForm] = useState("");
  const [priorityForm, setPriorityForm] = useState<Priority | "">("");
  const [descriptionForm, setDescriptionForm] = useState("");

  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  const { setRequests } = useRequests();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const request = await getRequestById(id);

        setTitleForm(request.title);
        setCategoryForm(request.category);
        setPriorityForm(request.priority);
        setDescriptionForm(request.description);

        setCreatedAt(request.createdAt);
        setUpdatedAt(request.updatedAt);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRequest();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!priorityForm) return;

    try {
      const data = {
        title: titleForm,
        description: descriptionForm,
        category: categoryForm,
        priority: priorityForm,
      };

      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, ...data } : request,
        ),
      );

      onClose();

      await updateRequest({ id, data });
    } catch (error) {
      console.log(error);
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

          <span className={styles.msg}>Detalhes</span>

          <div className={styles.header}>
            <label className={styles.labelForm}>
              <span className={styles.tags}>Título:</span>
              <input
                required
                className={`${styles.title} ${styles.disable}`}
                type="text"
                placeholder="Título da solicitação..."
                value={titleForm}
                onChange={(event) => setTitleForm(event.target.value)}
              />
            </label>

            <label className={`${styles.labelForm} ${styles.labelFormId}`}>
              <span className={styles.tags}>Id:</span>
              <input
                className={`${styles.title} ${styles.disable} ${styles.idForm}`}
                type="text"
                value={id}
                disabled
              />
            </label>
          </div>

          <div className={styles.containerPriotityCategory}>
            <label className={styles.labelForm}>
              <span>Categoria:</span>
              <input
                required
                className={`${styles.category} ${styles.disable}`}
                type="text"
                placeholder="Categoria..."
                value={categoryForm}
                onChange={(event) => setCategoryForm(event.target.value)}
              />
            </label>

            <label className={styles.labelForm}>
              <span>Prioridade:</span>
              <select
                required
                className={`${styles.priority} ${styles.disable}`}
                name="priority"
                id="priority"
                value={priorityForm}
                onChange={(event) =>
                  setPriorityForm(event.target.value as Priority)
                }
              >
                <option value="" disabled>
                  Prioridade...
                </option>
                <option value="LOW">Baixa</option>
                <option value="MEDIUM">Média</option>
                <option value="HIGH">Alta</option>
              </select>
            </label>
          </div>

          <label className={styles.labelDesc}>
            <span>Descrição:</span>
            <textarea
              required
              className={`${styles.description} ${styles.disable}`}
              name="description"
              placeholder="Descrição..."
              value={descriptionForm}
              onChange={(event) => setDescriptionForm(event.target.value)}
            />
          </label>

          <div className={styles.containerPriotityCategory}>
            <label className={styles.labelForm}>
              <span>Data de criação:</span>
              <input
                disabled
                className={`${styles.category} ${styles.disable}`}
                type="text"
                value={createdAt ? formatDate(createdAt) : ""}
              />
            </label>

            <label className={styles.labelForm}>
              <span>Última atualização:</span>
              <input
                disabled
                className={`${styles.category} ${styles.disable}`}
                type="text"
                value={updatedAt ? formatDate(updatedAt) : ""}
              />
            </label>
          </div>

          <button className={styles.send} type="submit">
            Salvar alterações
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRequestForm;
