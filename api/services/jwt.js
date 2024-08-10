import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;
export const token = {
  async generate(user) {
    console.log(user);
    const userForToken = {
      fullName: user.fullName,
      email: user.email,
    };
    console.log(userForToken);
    return jwt.sign(userForToken, secret, { expiresIn: "2m" });
  },
  async validate(req, res, next) {
    const token = req.headers?.authorization?.split(" ")[1];
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .json({ success: false, message: "Token expirado o invalido" });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      res.status(401).json({ success: false, message: "No existe token" });
    }
  },
};