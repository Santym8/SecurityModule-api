//-------Dependency Injection-----
import 'reflect-metadata';
import { Container } from 'typedi';

//-------Utils-----
import { IController } from './utils/IController';

//----------Configurations----------
import express from 'express';
import * as dotenv from 'dotenv';

//------------Midlewares-----------
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

//------------Controllers--------
import { ExampleController } from './modules/example/ExampleController';


export class Server {

    private app: express.Application;

    private urlControllers: { url: string, controller: IController }[] = [
        { url: '/example', controller: Container.get(ExampleController) },
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
        dotenv.config();
        this.app.set('port', process.env.PORT || 3000);

        // new DataBase().configDataBase();
        // if (process.env.POPULATE == 'true') {
        //     new PopulateDataBase().populate();
        // }

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