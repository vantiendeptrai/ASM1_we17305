import User from "../models/user";
import bcrypt from "bcryptjs";
import { signupSchema } from "../schemas/auth";

export const signup = async (req, res) => {
    try {
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        console.log("error", error);

        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        // Kiểm tra xem user đã đk chưa?
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(400).json({
                message: "Email đã tồn tại",
            });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        // không trả về password
        user.password = undefined;

        return res.status(201).json({
            message: "Tạo tài khoản thành công",
            user,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
