export class ResumesController {
    constructor(resumesService) {
        this.resumesService = resumesService;
    }

    applyResume = async (req, res, next) => {
        try {
            const { title, content } = req.body;
            const userId = req.user.userId;
            const resume = await this.resumesService.createResume(userId, title, content);

            return res.status(201).json({
                message: '이력서 등록이 완료되었습니다.',
                postId: resume.postId,
                userId: resume.UserId,
                title: resume.title,
                content: resume.content,
                status: resume.status,
                createdAt: resume.createdAt,
                updatedAt: resume.updatedAt,
            });
        } catch (error) {
            next(error);
        }
    };

    getAllResumes = async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { sort } = req.query;
            const resumes = await this.resumesService.getAllResumes(userId, sort);

            res.status(200).json(resumes);
        } catch (error) {
            next(error);
        }
    };

    getResumeById = async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { postId } = req.params;
            const resumeDetail = await this.resumesService.getResumeById(userId, postId);

            return res.status(200).json(resumeDetail);
        } catch (error) {
            next(error);
        }
    };

    updateResume = async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { postId } = req.params;
            const { title, content } = req.body;
            const updatedResume = await this.resumesService.updateResume(userId, postId, title, content);

            return res.status(200).json(updatedResume);
        } catch (error) {
            next(error);
        }
    };

    deleteResume = async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { postId } = req.params;
            const deletedResume = await this.resumesService.deleteResume(userId, postId);

            return res.status(200).json(deletedResume);
        } catch (error) {
            next(error);
        }
    };
}
