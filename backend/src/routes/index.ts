import { Router } from "express";

import { login } from "../controllers/auth/login";
import { register } from "../controllers/auth/register";
import { create as createInteraction } from "../controllers/interactions/create";
import { deleteInteraction } from "../controllers/interactions/delete";
import { patch as patchInteraction } from "../controllers/interactions/patch";
import { create as createLead } from "../controllers/leads/create";
import { list as listLeads } from "../controllers/leads/list";
import { show as showLead } from "../controllers/leads/show";
import { list as listStatus } from "../controllers/status/list";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// Auth-free routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/leads", authMiddleware, listLeads);
router.post("/leads", authMiddleware, createLead);
router.get("/leads/:id", authMiddleware, showLead);
router.get("/status", authMiddleware, listStatus);

router.post("/leads/:id/interactions", authMiddleware, createInteraction);
router.delete(
  "/leads/:id/interactions/:interactionId",
  authMiddleware,
  deleteInteraction,
);
router.patch(
  "/leads/:id/interactions/:interactionId",
  authMiddleware,
  patchInteraction,
);
export default router;
