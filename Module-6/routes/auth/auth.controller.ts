import {Controller, Post, Req, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

@Controller('auth')
export class AuthController {
    constructor(private readonly appService: AuthService) {}

    @Post('register')
    async register(@Req() req, @Res() res) {
        try {
            const { firstName, lastName, email, password } = req.body;
            if (!(email && password && firstName && lastName)) {
                return res.status(400).send("All input is required");
            }

            const oldUser = await this.appService.getUser(email);
            if (oldUser) {
                return res.status(409).send("User Already Exist. Please Login");
            }

            const encryptedPassword = await bcrypt.hash(password, 10);
            const user = await this.appService.createUser({
                firstName,
                lastName,
                email: email.toLowerCase(),
                password: encryptedPassword,
                role: 'basic'
            });
            return res.status(201).send(user);
        } catch (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }
    }

    @Post('login')
    async login(@Req() req, @Res() res) {
        try {
            // const oldUser = await this.appService.getUsers();
            // return res.send(oldUser);

            const { email, password } = req.body;
            if (!(email && password)) {
                res.status(400).send("All input is required");
            }
            const user = await this.appService.getUser(email);
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (user && isPasswordValid) {
                // Create token
                const token = jwt.sign(
                  { user_id: user._id, email, role: user.role },
                  process.env.TOKEN_KEY!,
                  {
                      expiresIn: "2h",
                  }
                );
                return res.status(200).json({
                    token
                });
            }
            return res.status(400).send("Invalid Credentials");
        } catch (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }
    }
}
