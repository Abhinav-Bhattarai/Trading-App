import { UserModel } from "../Models/UserModel.js";

export const SignupMiddleware = async(req, res, next) => {
  const { PhoneNumber, Password, Confirm } = req.body;
  if (PhoneNumber.length > 9 && Password.length > 7 && Confirm === Password) {
    const num_regex = /[0-9]/
    if (num_regex.exec(Password) !== null) {
      const response = await UserModel.findOne({ PhoneNumber });
      if (response === null) {
        console.log('next')
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

