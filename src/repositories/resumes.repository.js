import { prisma } from '../utils/prisma.util.js';

export class ResumesRepository {
    async createResume(userId, title, content) {
        return await prisma.posts.create({
            data: {
                UserId: userId,
                title,
                content,
                status: 'APPLY',
            },
        });
    }

    async findAllResumes(userId, sort) {
        const orderBy = sort && sort.toLowerCase() === 'asc' ? { createdAt: 'asc' } : { createdAt: 'desc' };
        return await prisma.posts.findMany({
            where: { UserId: userId },
            orderBy,
            include: { User: { select: { name: true } } },
        });
    }

    async findResumeById(userId, postId) {
        return await prisma.posts.findFirst({
            where: { postId: +postId, UserId: userId },
            include: { User: true },
        });
    }

    async updateResume(userId, postId, updateData) {
        const resume = await prisma.posts.findFirst({
            where: { postId: +postId, UserId: userId },
        });
        if (!resume) {
            throw new Error('이력서가 존재하지 않습니다.');
        }
        return await prisma.posts.update({
            where: { postId: +postId },
            data: updateData,
        });
    }

    async deleteResume(userId, postId) {
        const resume = await prisma.posts.findFirst({
            where: { postId: +postId, UserId: userId },
        });
        if (!resume) {
            throw new Error('이력서가 존재하지 않습니다.');
        }
        await prisma.posts.delete({
            where: { postId: +postId },
        });
        return { postId: +postId };
    }
}
