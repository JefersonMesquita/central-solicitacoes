import type { Request, Response } from "express";
import idParams from "../schemas/id-params.schema.js";
import deleteItemRequest from "../services/delete-request.service.js";

const deleteRequest = async (req: Request, res: Response) => {
  const { id } = idParams.parse(req.params);
  const request = await deleteItemRequest(id);

  if (!request) {
    return res
      .status(404)
      .json({ error: { message: "Solicitação não encontrada." } });
  }

  res.json(request);
};

export default deleteRequest;
