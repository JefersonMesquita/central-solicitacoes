import { Plus } from "lucide-react";
import styles from "./AddRequest.module.css";
import { useEffect, useState } from "react";
import RequestForm from "./CreateRequestForm";

const AddRequest = () => {
  const [requestFormOpen, setRequestFormOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = requestFormOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [requestFormOpen]);

  return (
    <div>
      <button
        className={styles.addRequests}
        onClick={() => setRequestFormOpen(true)}
      >
        <Plus size={42} strokeWidth={1.6} color="black" />
      </button>
      {requestFormOpen && (
        <RequestForm onClose={() => setRequestFormOpen(false)} />
      )}
    </div>
  );
};

export default AddRequest;
