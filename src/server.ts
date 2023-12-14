//-------Dependency Injection-----
import 'reflect-metadata';
import { Container } from 'typedi';

//-------Utils-----
import { IController } from './utils/IController';

//----------Configurations----------
import express from 'express';
import { DataSource } from 'typeorm';
import { DataSourceConfig } from './config/data-base/DataSourceConfig';

//------------Midlewares-----------
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

//------------Controllers--------
import { UserController } from './modules/User/Controller/UserController';


export class Server {

    private app: express.Application;

    private urlControllers: { url: string, controller: IController }[] = [
        { url: '/api/user', controller: Container.get(UserController) }
    ];

    constructor() {
        this.app = express();
        this.config();
    }

    //------------------------Config--------------------
    private addRouters() {
        this.app.get('/', (req, res) => res.send('WORKS!'));
        this.urlControllers.forEach(urlController => {
            this.app.use(urlController.url, urlController.controller.getRouter())
        });
    }

    private addMiddlewares() {
        this.app.use(morgan('dev'));
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(compression());
        this.app.use(cors());
    }

    private addErrorHandling() {
        // this.app.use(Container.get(ErrorHandling).getErrorHandling());
    }

    private config() {
        
        this.app.set('port', process.env.PORT || 3000);

        Container.get(DataSourceConfig).getDataSource().initialize()
            .then((dataSource: DataSource) => {
                Container.set('DataSource', dataSource);
            })
            .catch((error: any) => {
                console.log(error);
            });


        this.addMiddlewares();
        this.addRouters()
        this.addErrorHandling();

    }


    //-------------Start----------------
    public start() {
        let port = this.app.get('port');
        this.app.listen(port, () => console.log('Server on port ', port))
    }
}