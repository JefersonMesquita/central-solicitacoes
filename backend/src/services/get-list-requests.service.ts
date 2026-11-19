import { z } from "zod";
import prisma from "../lib/prisma.js";
import queryParams from "../schemas/get-list-requests.schema.js";

const getListRequestsService = (filters: z.infer<typeof queryParams>) =>
  prisma.serviceRequest.findMany({
    where: {
      ...(filters.status && { status: filters.status }),
      ...(filters.priority && { priority: filters.priority }),
    },
    orderBy: {
      createdAt: filters.order ?? "desc",
    },
  });

export default getListRequestsService;
