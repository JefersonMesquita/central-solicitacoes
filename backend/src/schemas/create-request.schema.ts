import { z } from "zod";
import { Priority } from "../../generated/prisma/enums.js";

const requestSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "O título é obrigatório")
    .max(200, "O título deve ter no máximo 200 caracteres"),
  description: z.string().trim().min(1, "A descrição é obrigatória."),
  // Atualizar pra limitar o banco de dados tbm
  category: z
    .string()
    .trim()
    .min(1, "A categoria é obrigatória")
    .max(100, "O título deve ter no máximo 100 caracteres"),
  priority: z.enum(Priority, "Prioridade inválida"),
});

export default requestSchema;
