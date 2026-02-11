import { Router } from "express";

import { login } from "../controllers/auth/login";
import { register } from "../controllers/auth/register";
import { create as createLead } from "../controllers/leads/create";
import { list as listLeads } from "../controllers/leads/list";
import { list as listStatus } from "../controllers/status/list";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// Auth-free routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/leads", authMiddleware, listLeads);
router.post("/leads", authMiddleware, createLead);
router.get("/status", authMiddleware, listStatus);

export default router;
