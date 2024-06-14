import { prisma } from '../utils/prisma.util.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    ACCESS_TOKEN_EXPIRES_IN,
    HASH_SALT_ROUNDS,
    
  } from '../constants/auth.constant.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';


export class AuthService {
    async signUp(email, password, passwordConfirm, name) {
        if (!email) {
            throw new Error('이메일을 입력해 주세요.');
        }
        if (!password) {
            throw new Error('비밀번호를 입력해 주세요.');
        }
        if (!passwordConfirm) {
            throw new Error('비밀번호 확인을 입력해 주세요.');
        }
        if (!name) {
            throw new Error('이름을 입력해 주세요.');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('올바른 이메일 형식이 아닙니다.');
        }

        if (password.length < 6) {
            throw new Error('비밀번호는 6자리 이상이어야 합니다.');
        }

        if (password !== passwordConfirm) {
            throw new Error('비밀번호가 일치하지 않습니다.');
        }

        const existingUser = await prisma.users.findFirst({ where: { email } });
        if (existingUser) {
            throw new Error('이미 가입된 이메일입니다.');
        }

        const hashedPassword = await bcrypt.hash(password, HASH_SALT_ROUNDS);

        const newUser = await prisma.users.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: 'APPLICANT'
            }
        });

        return newUser;
    }

    async signIn(email, password) {
        if (!email || !password) {
            throw new Error(`${!email ? '이메일' : '비밀번호'}을 입력해 주세요.`);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('이메일 형식이 올바르지 않습니다.');
        }

        const user = await prisma.users.findFirst({ where: { email } });
        if (!user) {
            throw new Error('존재하지 않는 이메일입니다.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('비밀번호가 일치하지 않습니다.');
        }
        const payload = { id: user.id};
        const token = jwt.sign(payload, ACCESS_TOKEN_SECRET,
            { expiresIn:ACCESS_TOKEN_EXPIRES_IN }
        );

        return { token, user };
    }
}
