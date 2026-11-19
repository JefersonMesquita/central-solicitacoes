import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

import type { ServiceRequest } from "../types/requests";

type RequestsContextType = {
  requests: ServiceRequest[];
  setRequests: Dispatch<SetStateAction<ServiceRequest[]>>;
};

const RequestsContext = createContext<RequestsContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export const RequestsProvider = ({ children }: Props) => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  return (
    <RequestsContext.Provider value={{ requests, setRequests }}>
      {children}
    </RequestsContext.Provider>
  );
};

export const useRequests = () => {
  const context = useContext(RequestsContext);

  if (!context) {
    throw new Error(
      "useRequests deve ser utilizado dentro de RequestsProvider",
    );
  }

  return context;
};
