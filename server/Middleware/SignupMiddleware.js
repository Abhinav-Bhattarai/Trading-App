import { UserModel } from "../Models/UserModel.js";

export const SignupMiddleware = (req, res, next) => {
  const { PhoneNumber, Password, Confirm } = req.body;
  if (PhoneNumber.length > 9 && Password.length > 7 && Confirm === Password) {
    if (num_regex.exec(Password) !== null) {
      const response = UserModel.findOne({ PhoneNumber });
      if (!response) {
        next();
      } else {
        return res.json({ error: true });
      }
    } else {
      return res.json({ error: true });
    }
  } else {
    return res.json({ error: true });
  }
};

