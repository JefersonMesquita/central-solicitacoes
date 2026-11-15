import { z } from "zod";

const idParamsSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .positive("O ID deve ser um número inteiro positivo."),
});

export default idParamsSchema;
