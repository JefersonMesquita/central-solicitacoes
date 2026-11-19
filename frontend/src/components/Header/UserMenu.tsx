import styles from "./UserMenu.module.css";
import { User } from "lucide-react";
// type Props = {}

const Perfil = () => {
  const isLogged = false;

  return (
    <div className={styles.container}>
      <button className={styles.icon}>
        <User size={24} strokeWidth={2} color="black" />
      </button>
      {!isLogged && (
        <div className={styles.options}>
          <p>Entrar</p>
          <p>Cadastrar</p>
        </div>
      )}
      {isLogged && (
        <div className={styles.options}>
          <p>Solicitações salvas</p>
          <p>Sair</p>
        </div>
      )}
    </div>
  );
};

export default Perfil;
