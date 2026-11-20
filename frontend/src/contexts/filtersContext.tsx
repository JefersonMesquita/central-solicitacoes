import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

import { getRequestsQuery } from "../api/getRequestsQuery";
import { useRequests } from "./requestsContext";

export type Filters = {
  order: "asc" | "desc";
  priority: string;
  status: string;
  search: string;
};

type FiltersContextType = {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const FiltersProvider = ({ children }: Props) => {
  const { setRequests } = useRequests();

  const [filters, setFilters] = useState<Filters>({
    order: "desc",
    priority: "",
    status: "",
    search: "",
  });

  useEffect(() => {
    getRequestsQuery(filters).then(setRequests).catch(console.error);
  }, [filters, setRequests]);

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error("useFilters deve ser utilizado dentro de FiltersProvider");
  }

  return context;
};
