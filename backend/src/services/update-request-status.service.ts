// services/update-request-status.service.ts
import prisma from "../lib/prisma.js";
import type { RequestStatus } from "../../generated/prisma/enums.js";

const nextStatus = {
  OPEN: "IN_PROGRESS",
  IN_PROGRESS: "COMPLETED",
  COMPLETED: null,
} as const;

const updateRequestStatusService = async (
  id: number,
  status: RequestStatus,
) => {
  const current = await prisma.serviceRequest.findUnique({ where: { id } });

  if (!current) {
    return { type: "NOT_FOUND" } as const;
  }

  if (nextStatus[current.status] !== status) {
    return { type: "INVALID_TRANSITION", from: current.status } as const;
  }

  const request = await prisma.serviceRequest.update({
    where: { id },
    data: { status },
  });

  return { type: "OK", request } as const;
};

export default updateRequestStatusService;
