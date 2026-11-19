import prisma from "../lib/prisma.js";

const deleteRequest = (id: number) =>
  prisma.serviceRequest.delete({ where: { id } });

export default deleteRequest;
