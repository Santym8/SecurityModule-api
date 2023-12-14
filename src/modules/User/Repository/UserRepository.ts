import { Service } from 'typedi';
import { User } from '../model/User'
import { Repository } from 'typeorm';
import { DataSourceConfig } from '../../../config/data-base/DataSourceConfig';

@Service()
export class UserRepository {

    private userRepository: Repository<User>;

    constructor(
        private readonly dataSourceConfig: DataSourceConfig
    ) {
        this.userRepository = this.dataSourceConfig.getDataSource().getRepository(User);
    }

    public async create(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    public async getAll(): Promise<User[]> {
        return await this.userRepository.find();
    }
}