// controllers/get-request-by-id.controller.ts
import type { Request, Response } from "express";
import idParams from "../schemas/id-params.schema.js";
import getRequestByIdService from "../services/get-request-by-id.service.js";

const getRequestById = async (req: Request, res: Response) => {
  const { id } = idParams.parse(req.params);
  const request = await getRequestByIdService(id);

  if (!request) {
    return res
      .status(404)
      .json({ error: { message: "Solicitação não encontrada." } });
  }

  res.json(request);
};

export default getRequestById;
