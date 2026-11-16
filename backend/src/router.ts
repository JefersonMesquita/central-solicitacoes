import { Router } from "express";
const router = Router();

// Middlewares

// Controllers
import createRequest from "./controllers/create-request.controller.js";
import getListRequest from "./controllers/get-list-requests.controller.js";
import getRequestById from "./controllers/get-request-by-id.controller.js";
import updateRequestStatus from "./controllers/update-request-status.controller.js";

router.post("/request", createRequest);
router.get("/request", getListRequest);
router.get("/request/:id", getRequestById);
router.patch("/request/:id", updateRequestStatus);

export default router;
