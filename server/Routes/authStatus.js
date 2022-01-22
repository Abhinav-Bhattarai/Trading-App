import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const CheckJWT = (token, id, uid) => {
  const status = jwt.verify(token, process.env.JWT_AUTH_TOKEN);
  if (status) {
    if (status.id === id && status.uid === uid) {
        return status;
    }
    return false
  };
  return false;
};

router.post("/", (req, res) => {
  try {
    const { authToken, uid, id } = req.cookies;
    const status = CheckJWT(authToken, id, uid);
    return res.json({ authStatus: status, error: false });
  } catch {
    return res.json({ authStatus: status, error: false });
  }
});

export default router;