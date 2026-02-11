import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

interface JwtPayload {
  userId: number;
  username: string;
  iat?: number;
  exp?: number;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.substring("Bearer ".length);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    (req as any).user = {
      id: decoded.userId,
      username: decoded.username,
    };
    return next();
  } catch (error) {
    console.error("Erro ao verificar token JWT:", error);
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
