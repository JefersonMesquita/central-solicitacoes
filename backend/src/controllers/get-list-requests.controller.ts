// controllers/get-list-requests.controller.ts
import type { Request, Response } from "express";
import queryParams from "../schemas/get-list-requests.schema.js";
import getListRequestsService from "../services/get-list-request.service.js";

const getListRequests = async (req: Request, res: Response) => {
  const filters = queryParams.parse(req.query);
  const requests = await getListRequestsService(filters);
  res.json(requests);
};

export default getListRequests;
