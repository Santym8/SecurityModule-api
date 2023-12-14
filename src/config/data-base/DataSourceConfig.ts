import { Service } from 'typedi';
import { DataSource } from "typeorm";
import { User } from '../../modules/User/model/User';

@Service()
export class DataSourceConfig {

    private dataSource!: DataSource;

    private createDataSource(): DataSource {
        return new DataSource({
            type: "mssql",
            host: process.env.DB_HOST || "localhost",
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 1433,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [User],
            synchronize: true,
            logging: false,
            extra: {
                trustServerCertificate: true,
            }

        });
    }

    public getDataSource(): DataSource {
        if (!this.dataSource) {
            this.dataSource = this.createDataSource();
        }
        return this.dataSource;
    }
}
