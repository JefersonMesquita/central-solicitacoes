// controllers/update-request-status.controller.ts
import type { Request, Response } from "express";
import idParamsSchema from "../schemas/id-params.schema.js";
import updateStatusSchema from "../schemas/update-request-status.schema.js";
import updateRequestStatusService from "../services/update-request-status.service.js";

const updateRequestStatus = async (req: Request, res: Response) => {
  const { id } = idParamsSchema.parse(req.params);
  const { status } = updateStatusSchema.parse(req.body ?? {});

  const result = await updateRequestStatusService(id, status);

  if (result.type === "NOT_FOUND") {
    return res
      .status(404)
      .json({ error: { message: "Solicitação não encontrada." } });
  }

  if (result.type === "INVALID_TRANSITION") {
    return res.status(409).json({
      error: {
        message: `Transição inválida: de ${result.from} para ${status}.`,
      },
    });
  }

  res.json(result.request);
};

export default updateRequestStatus;
