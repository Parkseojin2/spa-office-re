export class ResumesService {
    constructor(resumesRepository) {
        this.resumesRepository = resumesRepository;
    }

    async createResume(userId, title, content) {
        if (!title || !content) {
            throw new Error(`${!title ? '제목' : '내용'}을 입력해 주세요.`);
        }

        if (content.length < 150) {
            throw new Error("자기 소개는 150자 이상 작성해야 합니다.");
        }

        return await this.resumesRepository.createResume(userId, title, content);
    }

    async getAllResumes(userId, sort) {
        return await this.resumesRepository.findAllResumes(userId, sort);
    }

    async getResumeById(userId, postId) {
        const resume = await this.resumesRepository.findResumeById(userId, postId);
        if (!resume) {
            throw new Error('이력서가 존재하지 않습니다.');
        }

        return {
            postId: resume.postId,
            userName: resume.User.name,
            title: resume.title,
            content: resume.content,
            status: resume.status,
            createdAt: resume.createdAt,
            updatedAt: resume.updatedAt,
        };
    }

    async updateResume(userId, postId, title, content) {
        if (!title && !content) {
            throw new Error('수정할 정보를 입력해 주세요.');
        }

        if (content && content.length < 150) {
            throw new Error('자기 소개는 150자 이상 작성해야 합니다.');
        }

        const updateData = {};
        if (title) updateData.title = title;
        if (content) updateData.content = content;

        return await this.resumesRepository.updateResume(userId, postId, updateData);
    }

    async deleteResume(userId, postId) {
        return await this.resumesRepository.deleteResume(userId, postId);
    }
}
