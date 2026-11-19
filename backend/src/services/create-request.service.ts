import { z } from "zod";
import prisma from "../lib/prisma.js";
import requestSchema from "../schemas/create-request.schema.js";

const createRequestService = (data: z.infer<typeof requestSchema>) =>
  prisma.serviceRequest.create({ data });

export default createRequestService;
