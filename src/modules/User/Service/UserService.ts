import { Service } from 'typedi';
import { CreateUserRequest } from '../Dto/CreateUserRequest';
import { UserRepository } from '../Repository/UserRepository';
import { User } from '../model/User';

@Service()
export class UserService {

    constructor(
        private readonly userRepository: UserRepository
    ) { }

    public async createUser(request: CreateUserRequest): Promise<User> {
        const user: User = {
            username: request.username,
            email: request.email,
            dni: request.dni,
            password: request.password,
            status: true
        }
        const userCreated = this.userRepository.create(user)
            .catch((err) => {
                throw new Error(err);
            });

        return userCreated;
    }


}