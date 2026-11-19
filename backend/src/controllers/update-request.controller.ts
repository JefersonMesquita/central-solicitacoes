import type { Request, Response } from "express";
import idParamsSchema from "../schemas/id-params.schema.js";
import requestSchema from "../schemas/create-request.schema.js";
import updateRequestService from "../services/update-request.service.js";

const updateRequest = async (req: Request, res: Response) => {
  const { id } = idParamsSchema.parse(req.params);
  const data = requestSchema.parse(req.body ?? {});
  const updatedRequest = await updateRequestService(id, data);

  if (!updatedRequest) {
    return res
      .status(404)
      .json({ error: { message: "Solicitação não encontrada." } });
  }

  res.json(updatedRequest);
};

export default updateRequest;
