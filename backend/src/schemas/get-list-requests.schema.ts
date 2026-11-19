import { z } from "zod";
import { Priority, RequestStatus } from "../../generated/prisma/enums";

const queryParams = z.object({
  status: z.enum(RequestStatus, "Status inválido").optional(),
  priority: z.enum(Priority, "Prioridade inválida").optional(),
  order: z.enum(["asc", "desc"], "Ordem inválida").optional(),
});

export default queryParams;
