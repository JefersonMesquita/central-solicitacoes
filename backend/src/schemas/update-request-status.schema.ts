import { z } from "zod";
import { RequestStatus } from "../../generated/prisma/client.js";

const status = z.object({
  status: z.enum(RequestStatus),
});

export default status;
