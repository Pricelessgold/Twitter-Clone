import jwt from "jsonwebtoken";

export function getUserFromToken(authToken) {
  if (!authToken) {
    return null;
  }

  try {
    return jwt.verify(authToken, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}