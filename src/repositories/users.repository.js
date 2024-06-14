
export class UsersRepository {
    constructor(prisma){
     this.prisma = prisma;
    }


findAllUsers = async () => {
   
    const users = await this.prisma.users.findMany();

    return users;

};


findUserById = async (userId) => {
   
    const users = await this.prisma.users.findUnique({
        where: { userId }
    });

    return users;

};



}