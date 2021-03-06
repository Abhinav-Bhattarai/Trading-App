export const LoginMiddleware = (req, res, next) => {
  const { PhoneNumber, Password } = req.body;
  if (PhoneNumber.length > 9 && Password.length > 7) {
    const num_regex = /[0-9]/
    if (num_regex.exec(Password) !== null) {
      next();
    } else {
      return res.json({ error: true });
    }
  } else {
    return res.json({ error: true });
  }
};
