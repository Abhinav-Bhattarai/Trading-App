import express from "express";
import { LoginMiddleware } from "../Middleware/LoginMiddleware.js";
import { UserModel } from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

const router = express.Router();

const ComparePasswordHash = async () => {
  const status = await bcrypt.compare(Password, Hash);
  return status;
};

export const GenerateAuthToken = (config) => {
  const token = jwt.sign(config, process.env.JWT_AUTH_TOKEN);
  return token;
};

router.post("/", LoginMiddleware, async (req, res) => {
  const { PhoneNumber, Password } = req.body;
  const UserVerification = await UserModel.findOne({ PhoneNumber });
  if (UserVerification) {
    const match = await ComparePasswordHash(
      Password,
      UserVerification.Password
    );
    if (match) {
      const config = {
        uid: UserVerification.UID,
        id: UserVerification._id,
      };
      const token = GenerateAuthToken(config);
      if (token) {
        const cookie_option = {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        };
        res.cookie("authToken", token, cookie_option);
        res.cookie("uid", config.uid, cookie_option);
        res.cookie("id", config.id, cookie_option);
        return res.json({ authStatus: true, error: false, id: config.id });
      } else {
        return res.json({ authStatus: false, error: true });
      }
    } else {
      return res.json({ authStatus: false, error: true });
    }
  } else {
    return res.json({ authStatus: false, error: true });
  }
});

export default router;
