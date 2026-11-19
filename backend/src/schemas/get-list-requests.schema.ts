import { z } from "zod";
import { Priority, RequestStatus } from "../../generated/prisma/enums";

const queryParams = z.object({
  status: z.enum(RequestStatus, "Status inválido").optional(),
  priority: z.enum(Priority, "Prioridade inválida").optional(),

  // busca textual
  order: z.enum(["asc", "desc"]).default("desc"),
  search: z.string().trim().min(1).optional(),
});

export default queryParams;
