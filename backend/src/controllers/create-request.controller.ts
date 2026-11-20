import type { Request, Response } from "express";
import requestSchema from "../schemas/create-request.schema.js";
import createRequestService from "../services/create-request.service.js";

const createRequest = async (req: Request, res: Response) => {
  const data = requestSchema.parse(req.body ?? {});
  const newRequest = await createRequestService(data);
  res.status(201).json(newRequest);
};

export default createRequest;
