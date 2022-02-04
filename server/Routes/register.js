import express from "express";
import { SignupMiddleware } from "../Middleware/SignupMiddleware.js";
import bcrypt from "bcrypt";
import { UserModel } from "../Models/UserModel.js";
import { GenerateAuthToken } from "./login.js";

const router = express.Router();

const GenerateHash = async (Password) => {
  const hashedPassword = await bcrypt.hash(Password, 12);
  return hashedPassword;
};

router.post("/", SignupMiddleware, async (req, res) => {
  let { PhoneNumber, Password } = req.body;
  Password = await GenerateHash(Password);
  console.log(PhoneNumber, Password)
  const data = new UserModel({
    PhoneNumber,
    Password,
  });
  const response = await data.save();
  console.log(response);
  if (response) {
    const config = {
      uid: response.UID,
      id: response._id,
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
});

export default router;
