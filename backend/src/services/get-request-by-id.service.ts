// services/get-request-by-id.service.ts
import prisma from "../lib/prisma.js";

const getRequestByIdService = (id: number) =>
  prisma.serviceRequest.findUnique({ where: { id } });

export default getRequestByIdService;
