import { User } from "../model/ArchivosDeSistema/mongoDB/user.js";
import bcrypt from "bcryptjs"
import { token } from "../services/jwt.js";
const saltRounds = 10

export const userController = {
    // Registra al usuario
    async registerUser(req, res) 
    {
        const { fullName, email } = req.body;
        const password = await bcrypt.hash(req.body.password, saltRounds);
        const data = { fullName, email, password };
        const newUser = new User(data);
        try 
        {
          const savedUser = await newUser.save();
            res
            .status(201)
            .json({ sucess: true, message: "Usuario registrado", data: savedUser });
        } 
        catch (err) 
        {
            res
            .status(500)
            .json({ sucess: false, message: "Error Interno: " + err.message });
        }
      },

      // Loguea al usuario
      async loginUser(req, res) 
      {
        const user = await User.find().where({ email: req.body.email });
        if (!user.length) 
        {
            return res
            .status(401)
            .json({ success: false, message: "Email o Password incorrectos" });
        }
        const hashedPassword = user[0].password;

        const match = await bcrypt.compare(req.body.password, hashedPassword);
        if (!match) 
        {
            return res
            .status(401)
            .json({ success: false, message: "Email o Password incorrectos" });
        }
        const accessToken = await token.generate(user[0]);
        res
          .status(200)
          .json({ sucess: true, message: "Usuario logueado", data: accessToken });
        
      },
};