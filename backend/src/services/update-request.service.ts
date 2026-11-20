import { z } from "zod";
import prisma from "../lib/prisma.js";
import requestSchema from "../schemas/create-request.schema.js";

const updateRequestService = async (
  id: number,
  data: z.infer<typeof requestSchema>,
) => {
  const request = await prisma.serviceRequest.findUnique({ where: { id } });

  if (!request) return null;

  return prisma.serviceRequest.update({ where: { id }, data });
};

export default updateRequestService;
