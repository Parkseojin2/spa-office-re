import { AuthService } from '../services/auth.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
export class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    signUp = async (req, res, next) => {
        try {
            const { email, password, passwordConfirm, name } = req.body;
            const newUser = await this.authService.signUp(email, password, passwordConfirm, name);
            
            res.status(HTTP_STATUS.OK).json({
                message: '회원가입이 완료되었습니다.',
                userId: newUser.userId,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    signIn = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const { token, user } = await this.authService.signIn(email, password);

            res.header('authorization', `Bearer ${token}`);
            res.status(200).json({ message: '로그인에 성공하였습니다.', token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    };
}
