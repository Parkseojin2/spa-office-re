export class UsersController {
    constructor(usersRepository){
        this.usersRepository = usersRepository;
    }

    getUsers = async (req, res, next) => {
        try {
            const { userId } = req.user;
            const userProfile = await this.usersRepository.getUserProfile(userId);

            if (!userProfile) {
                return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
            }

            const { email, name, role, createdAt, updatedAt } = userProfile;
            res.status(200).json({
                message: '사용자 조회에 성공했습니다.',
                email,
                name,
                role,
                createdAt,
                updatedAt // 오타 수정
            });
        } catch (err) {
            next(err);
        }
    }
}
